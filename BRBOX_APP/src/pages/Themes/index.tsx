import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

import MainView from '../../components/MainView';
import { ThemeData, useTheme } from '../../Contexts/Theme';
import { useLinking } from '../../Contexts/LinkingProvider';
import { Pressable, Text, View } from 'react-native';
import styles from './styles';

import themes from '../../utils/themes/themes.json'


const Themes = () => {
    const navigation = useNavigation<any>();

    const { deepLinking } = useLinking();
    const { setTheme } = useTheme();

    useEffect(() => {
        deepLinking(navigation);
    }, []);

    const mapList = themes.map((theme, index) => {
        return <Pressable key={`themes${index}`} onPress={() => setTheme(theme)} style={({ pressed }) => pressed ? styles.styleBox : styles.styleBox1}>

            <Text> {theme.name}</Text>

        </Pressable>
    })

    return (
        <MainView showTitle showBottom headerTitle={100179}>

            <View style={styles.list}>
                {mapList}
            </View>

        </MainView>
    );
};

export default Themes;
