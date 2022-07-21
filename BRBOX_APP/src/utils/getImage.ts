/**
 * Import all images and custom icons
 * @param image string
 */
export default function getImages(image: string)
{
  switch(image) {
    case "loginbackground":
      return require("../../assets/img/loginbackground.png");
      break;
  }
}