import { Schema, model } from 'mongoose';
const StudentSchema = new Schema({
    data: { type: String, required: true }, // All student fields are encrypted as a string
});
export const Student = model('Student', StudentSchema);
//# sourceMappingURL=Student.js.map