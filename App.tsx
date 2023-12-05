import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  ListRenderItem,
  ListRenderItemInfo,
} from 'react-native';
import useProductList from './component/useProductList';

interface Product {
  id: number;
  image?: string;
  title: string;
  price: number;
  discountedPrice: number;
  description: string;
}

function App(): JSX.Element {
  const {products, loading, loadMore, isFetchingMore} = useProductList();

  const renderItem: ListRenderItem<Product> = ({
    item,
  }: ListRenderItemInfo<Product>) => {
    return (
      <View
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: '#f0f0f0',
          borderRadius: 8,
        }}>
        {item?.image === undefined ? (
          <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 8}}>
            No Image Found
          </Text>
        ) : (
          <Image
            source={{uri: item.image}}
            style={{width: 100, height: 100, borderRadius: 4}}
          />
        )}
        <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 8}}>
          {item.title}
        </Text>
        <Text style={{fontSize: 14, color: 'green'}}>Price: ${item.price}</Text>
        <Text style={{fontSize: 14, color: 'red'}}>
          Discounted Price: ${item.discountedPrice}
        </Text>
        <Text style={{fontSize: 12, marginTop: 8}}>{item.description}</Text>
      </View>
    );
  };

  const renderFooter = () => {
    return isFetchingMore ? (
      <View style={{marginTop: 10}}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    ) : null;
  };

  return (
    <View style={{flex: 1, padding: 16}}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString() + Math.random()}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
}

export default App;
