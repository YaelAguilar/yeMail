import mongoose, { Schema, Document } from 'mongoose';

export interface IEmail extends Document {
    from: string;
    to: string;
    subject: string;
    body: string;
}

const EmailSchema: Schema = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
});

const EmailModel = mongoose.model<IEmail>('Email', EmailSchema);

export default EmailModel;
