import { Schema, model, Document, Model } from 'mongoose';
import { PasswordManager } from '@Services/passwordManager';

// Use Attributes Document interface
interface UserAttrs {
  email: string;
  password: string;
}

// Use Document interface to define the document methods
interface UserDoc extends Document {
  email: string;
  password: string;
}

// Use Model interface to define the static methods
interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new Schema<UserDoc, UserModel>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
      versionKey: false,
    },
  },
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await PasswordManager.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = model<UserDoc, UserModel>('User', userSchema);

User.build({
  email: 'test@example.com',
  password: '123245',
});

export { User };
