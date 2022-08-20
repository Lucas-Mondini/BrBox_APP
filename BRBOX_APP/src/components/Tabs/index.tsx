import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import config from "../../../brbox.config.json";
import { useTheme } from '../../Contexts/Theme';

import style from './styles';

interface TabProps {
  setState: (state: any) => void;
  options: Option[];
  styles?: Object;
}

interface Option {
  title: string;
  state: any;
}

/**
 * @param Function setState Function responsible for changing tabs
 * @param Array options information
 */
const Tab: React.FC<TabProps> = ({setState, options, styles}) =>
{
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const titleColor = darkMode ? "#fff" : config.dark;

  function renderTabs()
  {
    const tabs = Array();
    options.forEach((option, index) => {
      tabs.push(
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setActiveTab(index);
            setState(option.state);
          }}
          key={index}
          style={[
            style.tabElement,
            {
              marginLeft: index > 0 ? 20 : 0,
              backgroundColor: index == activeTab ? config.greenBar : "transparent"
          }]}
        >
          <Text style={[style.tabText, {color: index == activeTab ? "#fff" : titleColor}]}>{option.title}</Text>
        </TouchableOpacity>)
    });

    return tabs;
  }

  return (
    <View style={[style.tabContainer, styles]}>
      {renderTabs()}
    </View>
  );
}

export default Tab;