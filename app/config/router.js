import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator, Header } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { NavigationComponent } from 'react-native-material-bottom-navigation-performance'

import {Image, Button, View, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ScannerQR from '../screens/ScannerQR';
import Upload from '../screens/Upload';
import LoginScreen from '../screens/LoginScreen';
import PointCard from '../screens/PointCard';
import Registration from '../screens/Registration';
import ChangePassword from '../screens/ChangePassword';
import RecoverPassword from '../screens/RecoverPassword';
import EventDetail from '../screens/EventDetail';
import NewsDetail from '../screens/NewsDetail';
import News from '../screens/News';
import More from '../screens/More';
import Api from './api.js';
import LocalStorage from './localStorage.js';
import ParticipantList from '../screens/ParticipantList'
import MakeEvent from '../screens/MakeEvent';
import MakeNewsItem from '../screens/MakeNewsItem';
import CreateAdmin from '../screens/CreateAdmin';
import Events from '../screens/Events';
import ChangeEmailRequest from '../screens/ChangeEmailRequest';
import ChangeEmail from '../screens/ChangeEmail';
import Intro from '../screens/Intro';

//StackNavigator for login related screens like login, register and password reset.
export const LoginStack = StackNavigator({
  LoginScreen: {
		screen: LoginScreen,
		navigationOptions: {
			title: 'Login',
		}
},Registration: {
		screen: Registration,
		navigationOptions: {
			title: 'Registreren',
		}
	},
  ChangePassword: {
    screen: ChangePassword,
	navigationOptions: {
		title: 'Wachtwoord veranderen',
	}
  },
  RecoverPassword: {
    screen: RecoverPassword,
	navigationOptions: {
		title: 'Wachtwoord vergeten',
	}
  },
  ChangeEmailRequest: {
  	screen: ChangeEmailRequest,
  	navigationOptions: {
  		title: 'E-mail adres verandering opvragen'
  	}
  },
  ChangeEmail: {
  	screen: ChangeEmail,
  	navigationOptions: {
  		title: 'E-mail adres veranderen'
  	}
  },
},{headerMode: 'none'
})

//Stack for all the admin screens
export const AdminStack = StackNavigator({
    MakeEvent: {
        screen: MakeEvent,
        navigationOptions: {
            title: 'Nieuw evenement',
        }
    },
    MakeNewsItem: {
      screen: MakeNewsItem,
      navigationOptions: {
        title: 'Nieuw artikel',
      }
    },
    CreateAdmin: {
        screen: CreateAdmin,
        navigationOptions: {
            title: 'Nieuw begeleider account',
        }
    }
},{headerMode: 'none'
})

//Stack for all the news screens
export const NewsStack = StackNavigator({
    NewsFeed: {
        screen: News,
        navigationOptions: {
            title: 'Nieuws',
        }
    },
    NewsDetail: {
        screen: NewsDetail,
        navigationOptions: {
            title: 'Nieuws',
        }
    }
},{headerMode: 'none'
})

//Stack for all the event screens
export const EventStack = StackNavigator({
    Events: {
        screen: Events,
        navigationOptions: {
            title: 'Evenementen',
        }
    },
    EventDetail: {
        screen: EventDetail,
        navigationOptions: {
            title: 'Evenementen',
        }
    }
},{headerMode: 'none'
})


//Stack for participants
export const ParticipantListStack = StackNavigator({
	ParticipantList: {
		screen: ParticipantList,
		navigationOptions: {
			title: 'Evenementen',
		}
	},
},{headerMode: 'none'
})

export const IntroStack = StackNavigator({
	Intro: {
		screen: Intro,
		navigationOptions: {
			title: 'Intro',
		}
	},
},{headerMode: 'none'
})

//TabNavigator for the app when logged in
export const MyTabLoggedIn = TabNavigator({
			EventStack: {
		        screen: EventStack,
		        navigationOptions: {
		        tabBarLabel: 'Evenementen',
				tabBarIcon: (
            		<Image style={{ width: 24, height: 24 }} source={require('../assets/icons/calendercolor.png')}/>
      			)
		        }
		      },
		     NewsCard: {
				screen: NewsStack,
				navigationOptions: {
				tabBarLabel: 'Nieuws',
				tabBarIcon: (
            		<Image style={{ width: 24, height: 24 }} source={require('../assets/icons/newscolor.png')}/>
      			)
				}
			},
			PointCard: {
		        screen: PointCard,
		        navigationOptions: {
	          	tabBarLabel: 'Stempelkaart',
				tabBarIcon: (
            		<Image style={{ width: 24, height: 24 }} source={require('../assets/icons/stempelcolor.png')}/>
      			)
		        }
		      },
			More: {
				screen: More,
				navigationOptions: {
				tabBarLabel: 'Meer',
				tabBarIcon: (
            		<Image style={{ width: 24, height: 24 }} source={require('../assets/icons/more.png')}/>
      			)
				}
			},
		}, {
		  		tabBarComponent: NavigationComponent,
		  		tabBarPosition: 'bottom',
		  		navigationOptions: ({ naviagtion }) => ({
	  				tabBarOnPress: (scene, jumpToIndex) => {
	  					if(scene.route.key == "PointCard") {
	  						let api = Api.getInstance();
	  						api.getPoints();
	  					}
	  					jumpToIndex(scene.index);
	  				}
		  		}),
				initialRouteName: 'EventStack',
		  		tabBarOptions: {
		    	bottomNavigationOptions: {
					shifting: false,
				style: {
					backgroundColor: 'white', elevation: 8,
					position: 'absolute',
			      	left: 0,
			      	right: 0,
			      	bottom: 0,
					borderTopLeftRadius: 10,
					borderTopRightRadius: 10
				},
		      	labelColor: 'grey',
				activeLabelColor: '#3bb222',
		      	rippleColor: '#3bb222',
		      	tabs: {
		        EventStack: {
					activeIcon:	<Image style={{ width: 28, height: 28 }} source={require('../assets/icons/calendercolor.png')}/>
		        },
				NewsCard: {
					activeIcon:	<Image style={{ width: 28, height: 28 }} source={require('../assets/icons/newscolor.png')}/>
		        },
		        PointCard: {
					activeIcon:	<Image style={{ width: 28, height: 28 }} source={require('../assets/icons/stempelcolor.png')}/>
		        },
				More: {
					activeIcon:	<Image style={{ width: 28, height: 28 }} source={require('../assets/icons/more.png')}/>
		        },
		      }
		    }
		  }
		})

//TabNavigator for the app when not logged in
export const MyTabNotLoggedIn = TabNavigator({
			EventStack: {
		        screen: EventStack,
		        navigationOptions: {
	          	tabBarLabel: 'Evenementen',
			  	tabBarIcon: (
            		<Image style={{ width: 24, height: 24 }} source={require('../assets/icons/calendercolor.png')}/>
      			)
		        }
		      },

			NewsCard: {
				screen: NewsStack,
				navigationOptions: {
				tabBarLabel: 'Nieuws',
				tabBarIcon: (
            		<Image style={{ width: 24, height: 24 }} source={require('../assets/icons/newscolor.png')}/>
      			)
				}
			},
			More: {
				screen: More,
				navigationOptions: {
				tabBarLabel: 'Meer',
				tabBarIcon: (
            		<Image style={{ width: 24, height: 24 }} source={require('../assets/icons/more.png')}/>
      			)
				}
			},
		}, {
		  		tabBarComponent: NavigationComponent,
		  		tabBarPosition: 'bottom',
		  		navigationOptions: ({ naviagtion }) => ({
		  			tabBarOnPress: (scene, jumpToIndex) => {
		  				jumpToIndex(scene.index);
		  			}
		  		}),
				initialRouteName: 'EventStack',
		  		tabBarOptions: {
		    	bottomNavigationOptions: {
				style: {
					backgroundColor: 'white', elevation: 8,
					position: 'absolute',
			      	left: 0,
			      	right: 0,
			      	bottom: 0,
					borderTopLeftRadius: 10,
					borderTopRightRadius: 10
				},
		      	labelColor: 'grey',
				activeLabelColor: '#3bb222',
		      	rippleColor: '#3bb222',
		      	tabs: {
		        EventStack: {
					activeIcon:	<Image style={{ width: 30, height: 30 }} source={require('../assets/icons/calendercolor.png')}/>
		        },
				NewsCard: {
					activeIcon:	<Image style={{ width: 30, height: 30 }} source={require('../assets/icons/newscolor.png')}/>
		        },
		        More: {
					activeIcon:	<Image style={{ width: 30, height: 30 }} source={require('../assets/icons/more.png')}/>
		        },
		      }
		    }
		  }
		})

//Root navigator with tabs and loginStack to navigate outside the tabs when going to login
export const MyAppNotLoggedIn = StackNavigator({
	MyTab: {
        screen: MyTabNotLoggedIn,
        navigationOptions: {
            header: null,
        }

    },

	LoginStack: {
		screen: LoginStack,
		navigationOptions: {
            header: null,
		}
	},
	IntroStack: {
		screen: IntroStack,
		navigationOptions: {
			header: null,
		}
	}
},{

})


export const MyAppLoggedIn = StackNavigator({
	MyTab: {
		screen: MyTabLoggedIn,
		navigationOptions: {
			header: null,
		}

	},
	LoginStack: {
		screen: LoginStack,
		navigationOptions: {
			header: null,
		}
	},
	AdminStack: {
		screen: AdminStack,
		navigationOptions: {
			header: null,
		}
	},
	ParticipantListStack: {
		screen: ParticipantListStack,
		navigationOptions: {
			header: null,
		}
	},
	IntroStack: {
		screen: IntroStack,
		navigationOptions: {
			header: null,
		}
	}
},{
})
