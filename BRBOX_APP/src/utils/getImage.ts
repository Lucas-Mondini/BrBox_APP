/**
 * Import all images and custom icons
 */
export default function getImages(image: string)
{
  switch(image) {
    case "controls":
      return require("../../assets/img/controls.png");
      break;
    case "book":
      return require("../../assets/img/book.png");
      break;
    case "axe":
      return require("../../assets/img/axe.png");
      break;
    case "axe-red":
      return require("../../assets/img/axe-red.png");
      break;
    case "axe-yellow":
      return require("../../assets/img/axe-yellow.png");
      break;
    case "axe-white":
      return require("../../assets/img/axe-white.png");
      break;
    case "sword":
      return require("../../assets/img/sword.png");
      break;
    case "loginbackground":
      return require("../../assets/img/loginbackground.png");
      break;
  }
}