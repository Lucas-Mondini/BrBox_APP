import { Linking } from "react-native";

export default function deedLinking(navigation: any)
{
  Linking.addEventListener("url", (event: any) => {
    Linking.removeAllListeners('url');

    const route = event.url.replace(/.*?:\/\//g, '') || "";

    const id = route.match(/\/([^\/]+)\/?$/)[1];

    const routeName = route.split('/')[0];

    if (routeName === 'gameinfo') {
      navigation.navigate('GameInfo', { id });
    }
  });
}