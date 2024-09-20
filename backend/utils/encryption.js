const mongoose = require("mongoose");
const crypto = require("crypto");

// Encryption key and IV (Initialization Vector)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16; // For AES, this is always 16 bytes

// Encryption function
function encrypt(text) {
  try {
    const iv = crypto.randomBytes(IV_LENGTH);

    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      iv
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
  } catch (e) {
    console.log(e);
  }
}

// Decryption function
function decrypt(text) {
  try {
    const textParts = text.split(":");
    const iv = Buffer.from(textParts.shift(), "hex");
    const encryptedText = Buffer.from(textParts.join(":"), "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (e) {
    console.log(e);
    return text;
  }
}

// Mongoose plugin for encryption
module.exports.encryptionPlugin = (schema, options) => {
  const fieldsToEncrypt = options.fields || [];

  // Encrypt fields before saving
  schema.pre("save", function (next) {
    fieldsToEncrypt.forEach((field) => {
      if (this.isModified(field)) {
        this[field] = encrypt(this[field]);
      }
    });
    next();
  });

  // Decrypt fields after fetching
  schema.post("find", function (docs) {
    docs.forEach((doc) => {
      fieldsToEncrypt.forEach((field) => {
        if (doc[field]) {
          doc[field] = decrypt(doc[field]);
        }
      });
    });
  });

  schema.post("findOne", function (doc) {
    console.log(doc);

    if (doc) {
      fieldsToEncrypt.forEach((field) => {
        if (doc[field]) {
          doc[field] = decrypt(doc[field]);
          console.log(field, decrypt(doc[field]));
        }
      });
    }
  });

  schema.post("findById", function (doc) {
    if (doc) {
      fieldsToEncrypt.forEach((field) => {
        if (doc[field]) {
          doc[field] = decrypt(doc[field]);
        }
      });
    }
  });

  // Add more post hooks for other query methods as needed
  // For example: findById, findByIdAndUpdate, etc.
};
