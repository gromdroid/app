import React, {
    Component
} from 'react';

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
		StyleSheet,
		ImageBackground,
		Dimensions,
		Share,
		TouchableHighlight,
		ListView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';



class ParticipantList extends Component {

constructor() {
  super();
  this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  this.state = {
	  map: true,
	  listViewData: {
		  0: {key: "0", text: "Gaauwe"},
		  1: {key: "1", text: "Jelmer"},
	  }
  }
  console.log(this.state.listViewData)
}

closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	}

	deleteRow(rowMap, rowKey) {
		this.closeRow(rowMap, rowKey);
		const newData = [...this.state.listViewData];
		const prevIndex = this.state.listViewData.findIndex(item => item.key === rowKey);
		newData.splice(prevIndex, 1);
		this.setState({listViewData: newData});
	}


  render() {

	  const leftContent = <Text>Pull to activate</Text>;

	  const rightButtons = [
	    <TouchableHighlight><Text>Button 1</Text></TouchableHighlight>,
	    <TouchableHighlight><Text>Button 2</Text></TouchableHighlight>
	  ];

    return(
		<ImageBackground blurRadius={3} source={require('../assets/sport_kids_bslim.jpg')} style={{width: '100%', height: '100%'}}>
		  <View style={styles.cardContainer} >
		  <SwipeListView
						dataSource={this.ds.cloneWithRows(this.state.listViewData)}
						renderRow={ data => (
							<TouchableHighlight
								onPress={ _ => console.log('You touched me') }
								style={styles.rowFront}
								underlayColor={'#AAA'}
							>
								<View>
									<Text>{data.text}</Text>
								</View>
							</TouchableHighlight>
						)}
						renderHiddenRow={ (data, secId, rowId, rowMap) => (
							<View style={styles.rowBack}>
							<TouchableOpacity style={styles.backLeftBtn} onPress={ _ => this.closeRow(rowMap, `${secId}${rowId}`) }>
								<Icon name="delete" size={24} color='white' />
							</TouchableOpacity>
								<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this.closeRow(rowMap, `${secId}${rowId}`) }>
									<Icon name="plus" size={24} color='white' />
								</TouchableOpacity>
								<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(rowMap, `${secId}${rowId}`) }>
								<Icon name="minus" size={24} color='white' />
								</TouchableOpacity>
							</View>
						)}
						leftOpenValue={75}
						rightOpenValue={-150}
					/>
          </View>
		</ImageBackground>
    );
  }
}



const styles = StyleSheet.create({

	rowFront: {
			alignItems: 'center',
			backgroundColor: '#fff',
			borderBottomColor: 'black',
			borderBottomWidth: 1,
			justifyContent: 'center',
			height: 50,
		},
		rowBack: {
			alignItems: 'center',
			backgroundColor: '#fff',
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		backTextWhite: {
		color: '#FFF'
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75
	},
	backLeftBtn: {
		backgroundColor: '#FF6700',
		paddingLeft: 25,
		justifyContent: 'center',
		width: '100%',
		height: '100%'
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
    cardContainer:{
    	height: Dimensions.get('window').height,
    	width: Dimensions.get('window').width,
		backgroundColor: 'white',

		paddingBottom: 150

    },
	listItem: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10
  },
})


export default ParticipantList;