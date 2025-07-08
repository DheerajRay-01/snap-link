import slugify from "slugify";
import { nanoid } from "nanoid";
import bcrypt from 'bcrypt'

const generateSlug = (custom_slug) => {
  if (custom_slug && custom_slug.length > 5) {
    const slug = slugify(custom_slug, {
      lower: true,
      strict: true, 
      trim: true,
    });
    console.log(slug);
    return slug;
  } else {
    return nanoid(6); 
  }
};

const hashPassword = async (password) => {
  try {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
  } catch (err) {
    console.error('Hashing failed:', err);
    throw err;
  }
};

const checkClickLimit = (clickLimit,clicks) =>{
  if (clickLimit > 0 && clicks >= clickLimit) return false
  return true
}

export { 
  generateSlug, 
  hashPassword,
  checkClickLimit
};
