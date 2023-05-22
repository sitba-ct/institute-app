import i18next from "i18next";

import courses_es from "../translations/es/courses.json";
import sidebar_es from "../translations/es/sidebar.json";
import sidebar_en from "../translations/en/sidebar.json";
import students_es from "../translations/es/students.json";
import students_en from "../translations/en/students.json";
import courses_en from "../translations/en/courses.json";
import groups_en from "../translations/en/groups.json";
import groups_es from "../translations/es/groups.json";
import cashFlow_en from "../translations/en/cashflow.json";
import cashFlow_es from "../translations/es/cashflow.json";
import reports_en from "../translations/en/reports.json";
import reports_es from "../translations/es/reports.json";
import signIn_en from "../translations/en/signIn.json";
import signIn_es from "../translations/es/signIn.json";
import signUp_en from "../translations/en/signUp.json";
import signUp_es from "../translations/es/signUp.json";
import resetPassword_es from "../translations/es/resetPassword.json";
import resetPassword_en from "../translations/en/resetPassword.json";

const configureLanguages = () => {
  i18next.init({
    interpolation: { escapeValue: false },
    lng: "en",
    resources: {
      es: {
        students: students_es,
        sidebar: sidebar_es,
        courses: courses_es,
        groups: groups_es,
        cashFlow: cashFlow_es,
        reports: reports_es,
        signIn: signIn_es,
        signUp: signUp_es,
        resetPassword: resetPassword_es,
      },
      en: {
        students: students_en,
        sidebar: sidebar_en,
        courses: courses_en,
        groups: groups_en,
        cashFlow: cashFlow_en,
        reports: reports_en,
        signIn: signIn_en,
        signUp: signUp_en,
        resetPassword: resetPassword_en,
      },
    },
  });
  return i18next;
};

export { configureLanguages };
