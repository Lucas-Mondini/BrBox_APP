import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  RefreshControl,
  ScrollView,
  Text,
  View
} from 'react-native';

import GameCard from '../../components/GameCard';
import MainView from '../../components/MainView';

import { useTerm } from '../../Contexts/TermProvider';
import { useRequest } from '../../Contexts/Request';
import { Game, GenreMode, Tag } from '../../utils/types';

import Input from '../../components/Input';
import Loading from '../../components/Loading';

import styles from './styles';
import { useLinking } from '../../Contexts/LinkingProvider';

import config from "../../../brbox.config.json";
import Tab from '../../components/Tabs';
import TagFilter from '../../components/TagFilter';
import Button from '../../components/Button';

const Search = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(true);
  const [loadingNoMore, setLoadingNoMore] = useState(false);

  const [amount] = useState(10);
  const [order] = useState("name");
  const [page, setPage] = useState(1);

  const [tab, setTab] = useState(1);
  const [tags, setTags] = useState<Tag[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [modes, setModes] = useState<GenreMode[]>([]);
  const [genres, setGenres] = useState<GenreMode[]>([]);
  const [gameName, setGameName] = useState("");

  const [tagsFilterList, setTagsFilterList] = useState<number[]>([]);
  const [modesFilterList, setModesFilterList] = useState<number[]>([]);
  const [genresFilterList, setGenresFilterList] = useState<number[]>([]);

  const { get } = useRequest();
  const { getTerm } = useTerm();
  const { deepLinking } = useLinking();

  async function getGames(newSearch?: boolean)
  {
    try {
      if (!newSearch && loadingNoMore) {
        setLoading(false);
        return;
      };

      const response = await get(
        `/game?page=${newSearch || gameName ? 1 : page}&name=${gameName}&ammount=${amount}&order=${order}&tagsIds=${tagsFilterList}&modesIds=${modesFilterList}&genresIds=${genresFilterList}`,
        setLoading
      );

      const gamesList = newSearch || gameName ? [] : games;

      if (response.games.length < amount) {
        setLoadingNoMore(true);
      }

      setGames([...gamesList, ...response.games]);
      setPage(page+1);
    } catch (err) {
      return;
    }

    setLoading(false);
  }

  function renderFilterTags(index: number, list: any[], idList: number[], idListSetter: (value: number[]) => void)
  {
    const sorted = list.sort((a,b) => a.name.length - b.name.length);

    const tags = sorted.map((tag, i) => (
      <TagFilter
        id={tag.id}
        key={i}
        text={tag.name}
        idList={idList}
        hideText={tab !== index}
        idListSetter={idListSetter}
      />
    ));

    return (
      <View style={[styles.filterContainer, {borderColor: tab === index ? config.greenBar : "transparent", display: tab === index ?  "flex" : "none", zIndex: tab === index ? 999 : 1}]}>
        <Text style={styles.filterTags}>
          {tags}
        </Text>
      </View>
    );
  }

  function searchOption()
  {
    return (
      <View style={[styles.inputView2]}>
        <Input
          placeholder={getTerm(100110)}
          extraStyles={styles.input}
          value={gameName}
          onChangeText={setGameName}
        />

        <View>
          <Tab
            options={[
              {title: getTerm(100155), state: 1},
              {title: getTerm(100156), state: 2},
              {title: getTerm(100030), state: 3}
            ]}
            setState={setTab}
          />

          {renderFilterTags(1, genres, genresFilterList,setGenresFilterList)}
          {renderFilterTags(2, modes, modesFilterList,setModesFilterList)}
          {renderFilterTags(3, tags, tagsFilterList,setTagsFilterList)}
        </View>

        <Button
          text={100000}
          loading={loading}
          onPress={() => getGames(true)}
        />
      </View>
    );
  }

  function renderGames()
  {
    return games.map(game => (
      <GameCard
        id={game.id}
        key={game.id}
        title={game.name}
        tags={game.tags}
        imgUri={game.image}
      />
    ));
  }

  async function fetchData(route: string, setData: (value: any[]) => void, last?: boolean)
  {
    try {
      const data = await get(route, () => {});


      setData(data);
    } catch (err) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }

    last && setLoading(false);
  }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}: any) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  }

  useEffect(() => {
    if (isFocused) {
      setLoadingNoMore(false);
      getGames();

      setLoading(true);
      fetchData("/tag", setTags);
      fetchData("/mode", setModes);
      fetchData("/genre", setGenres, true);
    }
  }, [isFocused]);

  useEffect(() => {
    deepLinking(navigation);
  }, [isFocused]);

  return (
    <MainView
      showTitle
      headerTitle={100000}
      showBottom
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => getGames(true)}/>
        }
        style={styles.container}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            getGames();
          }
        }}
        scrollEventThrottle={400}
      >
        {searchOption()}
        {renderGames()}
        {(!loadingNoMore && loading) && <Loading />}
      </ScrollView>

    </MainView>
  );
};

export default Search;