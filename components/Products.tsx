import React from 'react';
import {
  Image,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import axios from 'axios';
import _ from 'lodash';
interface Iprops {
  navigation?: any;
}
interface data {
  title: string;
  description: string;
  price: number;
  id: number;
  images: string;
}
interface Istate {
  data: any;
  searchQuery: any;
  myData: any;
}
class Products extends React.Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      data: [],
      searchQuery: '',
      myData: [],
    };
  }
  componentDidMount(): void {
    axios
      .get('https://dummyjson.com/products')
      .then(res =>
        this.setState({data: res.data.products, myData: res.data.products}),
      );
  }

  handlePress = () => {
    this.props.navigation.navigate('SingleProduct');
    console.log();
  };
  renderitm = ({item}: {item: data}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(item.id);
          this.props.navigation.navigate('SingleProduct', {
            idx: item.id,
            item: item,
          });
        }}>
        <View style={styles.card}>
          <View>
            <Image
              source={{uri: item.images[0]}}
              style={{height: 100, width: 120, borderRadius: 10}}
              resizeMode="stretch"
            />
          </View>
          <View style={{marginLeft: 10}}>
            <Text style={styles.titlestyle}>{item.title}</Text>

            <Text style={styles.discStyle}>{item.description}</Text>

            <Text style={styles.priceStyle}>₹ {item.price} </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  handleSearch = (text: string) => {
    const {myData} = this.state;
    const filteredProducts = myData.filter((product: {title: string}) => {
      const productName = product.title.toLowerCase();
      const searchTerm = text.toLowerCase();
      return productName.includes(searchTerm);
    });
    this.setState({searchQuery: text, data: filteredProducts});
  };

  render(): React.ReactNode {
    const {data} = this.state;
    return (
      <View style={{backgroundColor: '#ff8b24'}}>
        <TextInput
          placeholder="Search for products..."
          value={this.state.searchQuery}
          onChangeText={txt => this.handleSearch(txt)}
        />

        <FlatList
          data={data}
          renderItem={this.renderitm}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}
export default Products;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#ffffffaa',
    borderRadius: 10,
    padding: 7,
  },
  titlestyle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  discStyle: {
    color: '#000000aa',
    fontSize: 15,
    display: 'flex',
  },
  priceStyle: {
    color: '#000000aa',
  },
});
