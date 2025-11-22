import Counter from '../models/counter.js';

const roleMap = {
  student: 'stu',
  teacher: 'teacher',
  admin: 'admin',
  superadmin: 'superadmin',
};

export async function generateCustomID(role) {
  const prefix = 'MNS';

  const roleCode = roleMap[role.toLowerCase()];
  if (!roleCode) {
    throw new Error('Invalid role');
  }

  const counter = await Counter.findOneAndUpdate(
    { role: roleCode },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  );

  const paddedNumber = String(counter.count).padStart(3, '0');
  return `${prefix}_${roleCode}_${paddedNumber}`;
}
