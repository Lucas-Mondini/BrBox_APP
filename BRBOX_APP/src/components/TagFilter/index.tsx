import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

import config from "../../../brbox.config.json";
import { useTheme } from "../../Contexts/Theme";

interface TagFilterProps {
  id: number;
  text: string;
  idList: number[];
  hideText: boolean;
  idListSetter: (value: number[]) => void;
}

export default function TagFilter({ id, text, idList, hideText, idListSetter }: TagFilterProps)
{
  const [selected, setSelected] = useState(false);

  const { darkMode } = useTheme();

  const bgColor = darkMode && !selected ? "#fff" : selected ? config.orange : config.light;

  useEffect(() => {
    if (selected) {
      idListSetter([...idList, id]);
    } else {
      const notIn = idList.filter(id1 => id1 !== id);
      idListSetter(notIn);
    }
  }, [selected]);

  return (
    <TouchableOpacity onPress={() => {
        setSelected(!selected);
      }}
      style={{backgroundColor: bgColor, paddingHorizontal: 5, marginHorizontal: 5,  borderRadius: 8, justifyContent: "center", alignItems: "center", minHeight: 30}}
    >
      <Text style={[{
        textAlign: "center", color: config.dark, fontFamily: config.fontFamilyBold, display: hideText ? "none" : "flex"
      }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}