import IMAGES from 'common/images';

const DATA = {
  //Pricing Plan Screen

  princingPlan: [
    {
      monthamount: '3.00 ',
      coverageAmount: '3000',
      plans: [
        {
          plan: 'Sed ut perspiciatis unde omnis iste natus error unde omnis iste',
          isPlanIncluded: true,
        },
        {plan: 'Sed ut perspiciatis unde omnis', isPlanIncluded: false},
        {plan: 'Sed ut perspiciatis unde omnis', isPlanIncluded: false},
      ],
    },
    {
      monthamount: '10.00 ',
      coverageAmount: '10,00',
      plans: [
        {
          plan: 'Sed ut perspiciatis unde omnis iste natus error unde omnis iste',
          isPlanIncluded: true,
        },
        {plan: 'Sed ut perspiciatis unde omnis', isPlanIncluded: true},
        {plan: 'Sed ut perspiciatis unde omnis', isPlanIncluded: false},
      ],
    },
    {
      monthamount: '20.00 ',
      coverageAmount: '20,000',
      plans: [
        {
          plan: 'Sed ut perspiciatis unde omnis iste natus error unde omnis iste',
          isPlanIncluded: true,
        },
        {plan: 'Sed ut perspiciatis unde omnis', isPlanIncluded: true},
        {plan: 'Sed ut perspiciatis unde omnis', isPlanIncluded: true},
      ],
    },
  ],

  howToUsePolicy: [
    {text: 'Lorem ipsum dolor sit amet, consectetur adipiscing'},
    {text: 'Lorem ipsum dolor sit amet, consectetur adipiscing'},
    {text: 'Lorem ipsum dolor sit amet, consectetur adipiscing'},
  ],

  //Choose Location Screen Data
  chooseLocation: [
    {
      firstAddress: '2972 Westheimer Rd.',
      city: 'Santa Ana',
      state: 'Illinois',
      pincode: '85486',
    },
    {
      firstAddress: '1901 Thornridge Cir.',
      city: 'Shiloh',
      state: 'Hawaii',
      pincode: '81063',
    },
    {
      firstAddress: '2715 Ash Dr.',
      city: 'San Jose',
      state: 'South Dakota',
      pincode: '83475',
    },
    {
      firstAddress: '3517 W. Gray',
      city: 'St. Utica',
      state: 'Pennsylvania',
      pincode: '57867',
    },
  ],

  // Storage Space Selection Screen Data
  SizeData: [
    {
      id: 1,
      title: 'item 1',
      url: require('../assets/icons/listimg/listimg.png'),
      content: '10’ x 10’',
      contentValue: '$99/Month',
    },
    {
      id: 2,
      title: 'item 2',
      url: require('../assets/icons/listimg/listimg.png'),
      content: '10’ x 15’',
      contentValue: '$119/Month',
    },
    {
      id: 3,
      title: 'item 3',
      url: require('../assets/icons/listimg/listimg.png'),
      content: '10’ x 20’',
      contentValue: '$149/Month',
    },
    {
      id: 4,
      title: 'item 4',
      url: require('../assets/icons/listimg/listimg.png'),
      content: '10’ x 25’',
      contentValue: '$299/Month',
    },
    {
      id: 5,
      title: 'item 5',
      url: require('../assets/icons/listimg/listimg.png'),
      content: '10’ x 30’',
      contentValue: '$199/Month',
    },
    {
      id: 6,
      title: 'item 6',
      url: require('../assets/icons/listimg/listimg.png'),
      content: '10’ x 35’',
      contentValue: '$399/Month',
    },
  ],

  SmallSizeData: [
    {
      id: 1,
      title: 'item 1',
      url: require('../assets/icons/listimg/listimg.png'),
      content: '10’ x 10’',
      contentValue: '$99/Month',
    },
    {
      id: 2,
      title: 'item 2',
      url: require('../assets/icons/listimg/listimg.png'),
      content: '10’ x 15’',
      contentValue: '$119/Month',
    },
    {
      id: 3,
      title: 'item 3',
      url: require('../assets/icons/listimg/listimg.png'),
      content: '10’ x 20’',
      contentValue: '$149/Month',
    },
    {
      id: 4,
      title: 'item 4',
      url: require('../assets/icons/listimg/listimg.png'),
      content: '10’ x 25’',
      contentValue: '$299/Month',
    },
  ],

  MediumSizeData: [
    {
      id: 1,
      title: 'item 1',
      url: require('../assets/icons/listimg/listimg.png'),
      content: '10’ x 20’',
      contentValue: '$149/Month',
    },
    {
      id: 2,
      title: 'item 2',
      url: require('../assets/icons/listimg/listimg.png'),
      content: '10’ x 25’',
      contentValue: '$299/Month',
    },
    {
      id: 3,
      title: 'item 3',
      url: require('../assets/icons/listimg/listimg.png'),
      content: '10’ x 30’',
      contentValue: '$199/Month',
    },
  ],

  LargeSizeData: [
    {
      id: 1,
      title: 'item 1',
      url: require('../assets/icons/listimg/listimg.png'),
      content: '10’ x 30’',
      contentValue: '$199/Month',
    },
    {
      id: 2,
      title: 'item 2',
      url: require('../assets/icons/listimg/listimg.png'),
      content: '10’ x 35’',
      contentValue: '$399/Month',
    },
    {
      id: 3,
      title: 'item 3',
      url: require('../assets/icons/listimg/listimg.png'),
      content: '10’ x 30’',
      contentValue: '$199/Month',
    },
    {
      id: 4,
      title: 'item 4',
      url: require('../assets/icons/listimg/listimg.png'),
      content: '10’ x 35’',
      contentValue: '$399/Month',
    },
  ],

  // Language: [
  //   {
  //     value: 'Eng',
  //     languageLabel: 'English',
  //     image: IMAGES.ic_appLanguage,
  //   },
  //   {
  //     value: 'Hin',
  //     languageLabel: 'Hindi',
  //     image: IMAGES.ic_appLanguageHindi,
  //   },
  // ],

  // Lang: ['English', 'Hindi'],

  countriesWithFlags: [
    {title: 'English', image: IMAGES.ic_appLanguage},
    // {title: 'Hindi', image: IMAGES.ic_appLanguageHindi},
    {title: 'Spanish', image: IMAGES.ic_appLanguageSpanish},
  ],

  //Second Contact Info Screen
  Relationship: [
    {title: 'Spouse', image: IMAGES.ic_appLanguage},
    {title: 'Family Member', image: IMAGES.ic_appLanguage},
    {title: 'Friend', image: IMAGES.ic_appLanguage},
    {title: 'Other', image: IMAGES.ic_appLanguage},
  ],
};

export default DATA;
