import {Platform} from 'react-native';
import SIZES from 'utils/sizes';

//! for Animations
const useNativeDriver = Platform.select({ios: false, default: true});

const CONSTANTS = {
  // screen names
  APP_STACK: 'AppStack',
  AUTH_STACK: 'AuthStack',
  RENT_NOW_SCREEN: 'RentNowScreen',
  CHOOSE_LOCATION_SCREEN: 'ChooseLocationScreen',

  INSURANCE_PLAN_SCREEN: 'InsurancePlanScreen',
  STORAGE_SPACE_SELECTION_SCREEN: 'StorageSpaceSelectionScreen',
  SCAN_LICENSE: 'ScanLicense',
  SCAN_CREDIT_CARD: 'ScanCreditCard',
  SIGN_AGREEMENT: 'SignAgreement',
  PAYMENT_SCREEN: 'PaymentScreen',
  SUMMARY_OF_CHARGES: 'SummaryofCharges',

  CONTACT_INFO_SCREEN: 'ContactInfoScreen',
  SECOND_CONTACT_INFO_SCREEN: 'SecondContactInfoScreen',
  CONTACT_DETAILS_SCREEN: 'ContactDetailsScreen',
  EDIT_RENTER_CONTACT_DETAIL_SCREEN: 'EditRenterContactDetailScreen',
  EDIT_SECOND_CONTACT_DETAIL_SCREEN: 'EdirSecondContactDetailScreen',
  ADD_CREDIT_CARD_SCREEN: 'AddCreditCardScreen',

  SIGN_IN_SCREEN: 'SignInScreen',
  SIGN_UP_SCREEN: 'SignUpScreen',
  FORGOT_PASSWORD_SCREEN: 'ForgotPasswordScreen',
  HOME_SCREEN: 'HomeScreen',
  ROOT: 'Root',
  CHANGE_PASSWORD_SCREEN: 'ChangePasswordScreen',
  PROFILE_SCREEN: 'ProfileScreen',

  // image resize mode
  IMAGE_CENTER: 'center',
  IMAGE_CONTAIN: 'contain',
  IMAGE_COVER: 'cover',
  IMAGE_REPEAT: 'repeat',
  IMAGE_STRETCH: 'stretch',

  // // font family
  // FONT_ROBOTO: 'Roboto',
  // FONT_NOTO_SERIF_THAI: 'Noto Serif Thai',
  // FONT_NOTO_SANS_THAI: 'Noto Sans Thai',

  // language code
  ENGLISH: 'en',
  SPANISH: 'sp',

  ALL: 'All',
  MEDIUM: 'Medium',
  LARGE: 'large',
  SMALL: 'Small',
  LARGE1: 'Large',

  THEME_DARK: 'dark',
  THEME_LIGHT: 'light',

  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  PASSWORD: 'password',
  OLD_PASSWORD: 'oldPassword',
  NEW_PASSWORD: 'newPassword',
  CONFIRM_PASSWORD: 'confirmPassword',

  // Toast Message Type
  SUCCESS: 'success',
  ERROR: 'error',
  ERRORMESSAGE: 'something went wrong.Please try again',

  //! for Animations
  useNativeDriver,

  //! For Animation Open
  Animation_Open: {
    toValue: SIZES.tostHight,
    duration: 350,
    useNativeDriver: useNativeDriver,
  },

  //! For animation close
  Animation_Close: {
    toValue: SIZES.tostBackHight,
    duration: 350,
    delay: SIZES.tostTime,
    useNativeDriver: useNativeDriver,
  },

  HEADER_HEIGHT: 50,
  HEADER_BACK: 'Back',
  HEADER_RIGHT: 'Add Manually',

  //Storage Space Selection Screen
  VALUE: 'value',
  LABLE: 'languageLabel',
  IMAGE: 'image',
  //dateformat
  YYYYMMDD: 'mm-DD-yyyy',
  MMDDYYYY: 'mm/DD/yyyyy',
  // YYYYMMDD:'yyyy-mm-dd',
  //Payment Screen

  PHONE_NUMBER: '(603) 555-0123',
  PHONE_NUMBERUnformatted: '6035550123',
  EMAIL_ID: 'info@aspensquareinc.com',
  NAME_MAX_LENGTH: 30,
  ADDRESS_MAX_LENGTH: 120,
  BILLING_ADDRESS_MAX_LENGTH: 400,
  CONTACT_NUMBER_MAX_LENGTH: 14,
  CVV_MAX_LENGTH: 3,
  CREDIT_CARD_NUMBER_MAX_LENGTH: 19,
  PublicKey:
    'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQ0lqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FnOEFNSUlDQ2dLQ0FnRUEvQlVCS2VHSXlvOU1UU2oyaTd3Uwp5TXN6TmNTSWVLcjhiMEgxdEoyZjlvZWlrQk9wTy8rK3lGNDFOd1M2WER4NkxsRWdjd2VFdWM0dnd2bnJGK2ZlCjVvQlpVbTIxK05YQm8xZ3V4K3JvQTdFeVljZlhLekRRaVV2c3RhSEdPdnRpSWc0ME5YZUtVd2w2RjhVYWdhZUIKdWo4TUh5RmZLMFJqMEJyb2tOZGNramkzeHNkYUFGWThsb2o2NmtiS2J1UU5iM2UyZ3hvYVdpeGRrcllPOHY2Mwowb3ZZUDdMV0svNldIV1daV3JSQ3dkZ1QvcXFpM1RISVIxUlZWbkRRZWtsV0duK0NhejZpMUV6RlRjSXRpb09TClJySFFIdGMvRFV0TkgyNUx6Q085ektQZndRQythNzc5SDhoQVMvMUJUU0lqa3ZRQi92eFc2ckFyWVZMTGdWMXYKQmtzZmlMS09XaFJBWnBKVllkMUM0Q2NjT2tBeWJrNWNVQm52YndsNmNrbUtRMWJuWWIxVWZ0ZlkvSC9TVlhGdgoxZDNtSjdkb3IxNWd2N1p4d0x3bDhtcG83aUVnd29MbUtTdXFuRGUzaU5nd1VDa0ZQRDg4MExEUEdoSjFNZS96ClhkOGI3cTNPWjN1VGRQYmRRajVKMU5HYzRPZjVtSjZyMWkxTUtzNllYVnJJTFNIL0JkS1BCUk5QTG9SKzNZV2gKMUNpWDdveHdna29VQXF2aUEzR09RNldBcGFlandoaUFZb1ZkdjhnV2pxU0hDVTRpWTIwV2pvbzVvTnd1Y1Fxcgp0MnlJZ1BvQWNIZXNEUDF5MTd1S1NGa2xuU2VEdnZNdzRxYWZxcUV0MWt6aFNSWGc4ZndQNjNYL0hTSDNZQ3liCnIxamZxYUwwZTlKYnBUUnpYWXJIOWtzQ0F3RUFBUT09Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQo=',
  PrivateKey:
    'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlKS0FJQkFBS0NBZ0VBL0JVQktlR0l5bzlNVFNqMmk3d1N5TXN6TmNTSWVLcjhiMEgxdEoyZjlvZWlrQk9wCk8vKyt5RjQxTndTNlhEeDZMbEVnY3dlRXVjNHZ3dm5yRitmZTVvQlpVbTIxK05YQm8xZ3V4K3JvQTdFeVljZlgKS3pEUWlVdnN0YUhHT3Z0aUlnNDBOWGVLVXdsNkY4VWFnYWVCdWo4TUh5RmZLMFJqMEJyb2tOZGNramkzeHNkYQpBRlk4bG9qNjZrYktidVFOYjNlMmd4b2FXaXhka3JZTzh2NjMwb3ZZUDdMV0svNldIV1daV3JSQ3dkZ1QvcXFpCjNUSElSMVJWVm5EUWVrbFdHbitDYXo2aTFFekZUY0l0aW9PU1JySFFIdGMvRFV0TkgyNUx6Q085ektQZndRQysKYTc3OUg4aEFTLzFCVFNJamt2UUIvdnhXNnJBcllWTExnVjF2QmtzZmlMS09XaFJBWnBKVllkMUM0Q2NjT2tBeQpiazVjVUJudmJ3bDZja21LUTFiblliMVVmdGZZL0gvU1ZYRnYxZDNtSjdkb3IxNWd2N1p4d0x3bDhtcG83aUVnCndvTG1LU3VxbkRlM2lOZ3dVQ2tGUEQ4ODBMRFBHaEoxTWUvelhkOGI3cTNPWjN1VGRQYmRRajVKMU5HYzRPZjUKbUo2cjFpMU1LczZZWFZySUxTSC9CZEtQQlJOUExvUiszWVdoMUNpWDdveHdna29VQXF2aUEzR09RNldBcGFlagp3aGlBWW9WZHY4Z1dqcVNIQ1U0aVkyMFdqb281b053dWNRcXJ0MnlJZ1BvQWNIZXNEUDF5MTd1S1NGa2xuU2VECnZ2TXc0cWFmcXFFdDFremhTUlhnOGZ3UDYzWC9IU0gzWUN5YnIxamZxYUwwZTlKYnBUUnpYWXJIOWtzQ0F3RUEKQVFLQ0FnQUV5SE0rczdCUVE1ckxoZ0R6a3N4NmNkeVZZeGJCejJDOXphOFhUN3hXeGFrUWVjY0d3K24vVEVaUApObkJBeXNiNHRRSmNIR0xvMGFBM1gxMldGUWkyTCs1QjhhSDN5RHFGMm1qODB4aTI1VGhUQWFNMEJ4ZVYyMUp3CitkSlVrU3VDQU9uOXI3aDRyZC9hcnBzN3BZMkJGcXdvdFEza3VNWDZEMkNsU3VqUFAzTkJPc3dhNElnQ3hUT1oKbVdGQzdHSFM0UjhkNnJOZ1RhSXk0L0J4ck9LWkJKMUVUQ1RqTGMvMFc5YW1rWEFJMUl4QWswVkcxQ2g4TGYzMgpoMnAxUDRuNk03d3FROFI4S2I2K3BIWVB3RUpZeEF2eVlkd282T3BjTTlBTlhnbytaVWVjRm1NR2tWZWxNRHdFCkZSaVZtWlc2TnBZSkhBbWNKMTZUV0twUzJJNkFNdTNOeEwvWWh4bGZSUnlWOE5rZGxrZSt4TUd0eFF4bmgrWkIKYTM1Y0VmSlFRUUU4b3FEc0ppR0E5MHZBMDQ5NC9HNExDZmo5M3dGMHpJTWFSbmdCT3o1aXE3Ui9XZ0JBUEpuMQpUZFZWV3JzZExJQ2NPS0F0dXYwRnVDS1ozeVRGSzE5YW56WXhyekNFUGRNY1lNZm8zQnJXcEFSei9LbTFBK25qCitPdlFrUWJlSDB6VWpWaEw0SXA5clY5SVJGazRpNTk4dlNvQnhCeXVMQkpnaDcwQ25oazJONjErTGhhNWY2YWUKemlXdG9DNEhXMW9kUmhHb2wvNVhOK25WeElNRTZzdk9PNGJDQXRIc2dYb3FXK2xTZmNtdlVqT05kclozVTc1TQpwQW01cHlzYXF2bWJTS3d5MTduUWl1d0p0a2crcUFuRTlnbEkvejM2ZHZWcDJrdnk4UUtDQVFFQS9xRVQzelBmCkx1UlBwdTBTNFVSVE1ydkc0K0xCTEJCaWIweE8vSDdTY01ENXRWQmFJbEZhdFBRa2V4UEhJd0JVa3pzaVIyQ2oKd0Y1d3pxSlZXYTZmT2dmNjBRdUhjUzhtdmQ1NDdrOVNla0poaG4xd215cXB3Z1ZNc254dVdjOTBRWjFyME9pSwpmbFk2dEFkMEFxUXJwNkgwc01idW1PZit3andnQ3hsOHRFbkJCdHVQQXUxVnhRNkRkVXhCT09aVENwK21wZ1ZICnY2aW5BRWZhclU2bmorMlk3b0JjazVzVlovWndPNkYxdVUzR3NTbnFQMmJEMnlmNXdVUlNwaXNYL29GL0x6bXQKU2tvSzcxTUY5YmhzNUo5cDdlY1Q0OEZkTzFtL245eEczb3l5TzdDTVZxRVVFQmlYc1RoUjg0a04vQ1kyNWZoSwpLSkF5SFd2RXJ5YmcwUUtDQVFFQS9YQnFuOEpqTzI4bzFXaTFuOXNOSVdUZDVmSlBBUjJYV0NDSm5HcklDQTY2ClI2QmVNNmRFQ1FhV0xtTlVmc0RxMGdXY1ZtVHMxeElZK1ZSYVNGMm5JZ3Z4aTFiSjhaUDJhbmFlTy85SVhnbnoKUGphSWxOdHJqbU9MZHNIbDZwNzFiR09sYjRQK1F1S09TZmZWMzF1ZkVzZG5qODVOSnFvU0sxMTVDOHpOVk1iYgpwejVCK0IzSGJRNnpIZEtsYngyRlJFRktWdUJpSlhOdWRKL25FZlRPTVAyRnpEMnNvVzJzSmxXZGFtT2xKVm10CllhK1J2Z1FQN1pCczVQY25lNEE1eEl6UkkyZlpNSHY3eStiVHRuSHhESVg0eC85WllNVFlwb21zV2Q3WjRBVmMKNGlsWUdxNEtYZGJSMzJLWGsxc2NBTGN2Qy8wZEVoSzl1eUl4ZDdoTVd3S0NBUUJHS0FsNm9TY29HMTNhNTAwaApaaHJxU3BTVksyQUFEUStpRE10aWhHcmxDRGFFLzN1bUl2WTBEMlNSeUxSQWI1SGQ4eGdSeEkyNXJndTAwME5pCjcxc051UzhoTStVQWlYWktNQ2J2dWtsR1NFM29xVjFDVTNIc2RGdGFmakJGYklSaW84WVdERXhFWE92VnVJdjkKUWxDSTRuV3gwMDNnTVdPZkRzUGhhd2RTQVZRKzJIWEIzN1NYRTlXaWx2ME5lV0I5OTlrSnUwQzJqUGhlZW0zRQovSHZzaXhGcy9VOEVtR0ZBZ01VUm1QMy9yVzlHVnY4a3N1TFoybHpWSkVjRlk3QTd2bUJWbWJXbVYxcEY4SUVlCjM4NlkrMWRMWmpTenR3NUNFUXRjTjJ3TFc0YXNMWXV0UHJweGFPVTZ2Z0xPYi8rN2JxZ0htdTZMMkpjR1JqQXQKOWk5UkFvSUJBUUM2Mk85ekcwQkhxRHRsb3c0TWJkWHZZY3NLNWFzRGVvcUM2WElyQkxxMjNnek9FOWgvb25qUgpZcTdFUW0wZ0NpRFZlRmQ3aG1ycVlTaFNZYk15R1FISVl4L1FoOHJZdFNwOThUZlZxZTd6amNoc2ZJNFRtUFZpCkE5ZmxWU3lwM2ttNGdIcU9qYlNlSVNPZ092ek44R0dGMmNkclNVQ3VHY0xOZjl0bkxMWFJJODc3TFRZN3M5QzgKZ1pMaWtOTnc2VVhBUFphT0dGMmptTWU5YWNwVS9iUXFnQzd0bGlhNDJQK0xQNkdQdHlraE1VMVhjTFkxYmc5RQpLUzl2V3h3YnZEeGF3U3JMUEp2dVYrb2F1UElyVnpQTTlOU210b1p4aG83bnNTYUZGM3h2NGVSSnhRdDBtQTJDCmc0YzFkeDJqQVEvVEl6cW5UeFBvcURLRFRjRkVyM1p6QW9JQkFCeEdCM3FQS3N6SzJDUUorRDA4RmVzaTJVRCsKOXdvakVqK3h4YVpiOTdpQTl0cTMrM1RPTGM2MTdocUdqK1Aza1AwSXNuY0RVVHRpZ01PRE8zcy9VWVlnSDUreQpOMk55OVk2OERZbFV5aitHcHFHV25ucjMvdkpFa3FUZHZNUFBkNDJmcVFFNFhMUFRtUkNOT1dYSUtNV3BCcnNRCk1iZFZMN0YzcnZDbFNrMTJoekVkQzNUYWtoYmJiR3dzVStzRWFjUzdNSWUvKzVpYzQvT1FtRlpKT1daa1B4ZFoKSTUrcnp3REY5YXNGdndLbFdJSHhPVGNFK3o4bGJUaU5aeDN0YXBYdVB3cU9OcnhrWnh0ZnJkdXVqTm9tQkk0OApNZVA3RGcwZnFJYWVWZGNHQXRWS21IZit5aU56UVJEeGhNQWJ4WW1sTlRjLzBYZ2ttWnY2SERTc3hwdz0KLS0tLS1FTkQgUlNBIFBSSVZBVEUgS0VZLS0tLS0K',
};

export default CONSTANTS;
