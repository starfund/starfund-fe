export const formatTitle = (content, language) => {
  switch (language) {
    case 'es':
      return content.titleEs;
    case 'ru':
      return content.titleRu;
    case 'en':
      return content.title;
    default:
      return content.title;
  }
};

export const formatDescription = (content, language) => {
  switch (language) {
    case 'es':
      return content.descriptionEs;
    case 'ru':
      return content.descriptionRu;
    case 'en':
      return content.description;
    default:
      return content.description;
  }
};

export const formatName = (course, language) => {
  switch (language) {
    case 'es':
      return course.nameEs;
    case 'ru':
      return course.nameRu;
    default:
      return course.name;
  }
};

export const formatGoal = (course, language) => {
  switch (language) {
    case 'es':
      return course.courseGoalEs;
    case 'ru':
      return course.courseGoalRu;
    default:
      return course.courseGoal;
  }
};
