---
applyTo: '**'
---
# Contribution Guidelines for Frontend (React + JavaScript)

This document provides **rules and best practices** for any agentic AI contributing to the frontend part of this project, which is built using React and JavaScript.

## ✅ General Rules  
1. Do not delete existing code/files unless explicitly instructed.  
2. Do not overwrite configs (`package.json`, `jsconfig.json`, etc.) unless necessary.  
3. Always explain changes in comments or commit messages.  
4. Follow project structure strictly.  
5. Do not expose secrets (API keys, tokens). Use `.env`.  

---

## 🛠️ Code Practices  
- Use consistent coding style (ESLint + Prettier).  
- Write modular, reusable code.  
- Ensure type safety (JavaScript).  
- Handle errors properly.  
- Use meaningful names and self-documenting code.  

---

## 🚦 Git & Version Control  
- Never force push or rewrite history.  
- Use clear, descriptive commit messages.  
- Group related changes into one commit.  
- Do not commit `node_modules` or large files.  

---

## 🧪 Testing & Validation  
- Project must build successfully after changes.  
- Run and pass existing tests.  
- Avoid breaking changes.  

---

## 📦 Dependencies  
- Only install necessary packages.  
- Prefer well-maintained libraries.  
- Document why new dependencies were added.  

---

## 🖥️ Frontend Guidelines  
- Keep UI consistent with existing design (CSS/Tailwind).  
- Optimize for performance & accessibility.  
- Avoid inline styles unless required.  
- Follow React best practices (hooks, state).  

---

## 🔒 Security  
- Never hardcode sensitive data.  
- Validate and sanitize inputs.  
- Follow OWASP best practices.  

---

## 📋 Final Checklist  
- [ ] Code compiles without errors.  
- [ ] No ESLint/Prettier warnings.  
- [ ] No unused imports/variables.  
- [ ] Functionality tested & verified.  
- [ ] Commit message is clear.  

---
