import React, { useState, useEffect } from 'react';
import { isAndroid, isIOS, isMobile } from 'react-device-detect';
import TagManager from 'react-gtm-module';
import { AppsLinks, AppLink } from 'apps/ui/components/AppLinks';
import { HomePageSection } from 'apps/home/components/HomePageSection';
import UserJoinForm from 'apps/ui/components/UserJoinForm';
import { GTM_EVENTS } from 'constants/tracking';
import { getLocalData } from 'apps/ui/utils/localization';
import MorphlingBlur1 from './BackgroundMorphling/MorphlingBlur1';
import MorphlingBlur2 from './BackgroundMorphling/MorphlingBlur2';
import styles from './style.css';

const ProfileValue = () => {
  const moneyId0 = 'profile-value-0';
  const money0 = useMoneyUpdate(27, moneyId0);

  const moneyId1 = 'profile-value-1';
  const money1 = useMoneyUpdate(14, moneyId1);

  const moneyId2 = 'profile-value-2';
  const money2 = useMoneyUpdate(7, moneyId2);

  return (
    <HomePageSection className={styles.profileValue}>
      <div className={styles.profileValueOuter}>
        <div className={styles.morphBlur2}>
          <MorphlingBlur2 />
        </div>
        <div className={styles.profileValueInner}>
          <div className={styles.morphBlur1}>
            <MorphlingBlur1 />
          </div>
          <div className={styles.profileValueInnerBackground}>
            <div className={styles.money0} id={moneyId0}>${money0}</div>
            <div className={styles.money1} id={moneyId1}>${money1}</div>
            <div className={styles.money2} id={moneyId2}>${money2}</div>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>
              {getLocalData('pages.userLanding.profileValue.title')}
            </div>
            <div className={styles.descritpion}>
              {getLocalData('pages.userLanding.profileValue.descripion')}
            </div>
            <AppsLinks
              className={styles.apps}
              noLabel={true}>
              {isIOS && (
                <AppLink
                  className={styles.app}
                  classNamesMap={{ caption: styles.appCaption }}
                  size="large"
                  store="app-store"
                  withCaption={true} />
              )}
              {isAndroid && (
                <AppLink
                  className={styles.app}
                  classNamesMap={{ caption: styles.appCaption }}
                  size="large"
                  store="google-play"
                  withCaption={true} />
              )}
            </AppsLinks>
            {!isMobile && (
              <div className={styles.userJoinForm}>
                <UserJoinForm
                  classNamesMap={{
                    button: styles.userJoinFormButton,
                    textInputContainer: styles.userJoinFormTextInputContainer,
                  }}
                  onSuccess={handleUserJoinFormSuccess}
                  onPhoneChange={handleUserJoinPhoneChange} />
              </div>
            )}
          </div>
        </div>
      </div>
    </HomePageSection>
  );
};

function handleUserJoinFormSuccess() {
  const dataLayer = GTM_EVENTS.LANDING.FOOTER.JOIN_USER_FORM.BUTTON;

  if (dataLayer) {
    TagManager.dataLayer({ dataLayer });
  }
}

function handleUserJoinPhoneChange() {
  const dataLayer = GTM_EVENTS.LANDING.FOOTER.JOIN_USER_FORM.INPUT;

  if (dataLayer) {
    TagManager.dataLayer({ dataLayer });
  }
}

const pfx = [
  {
    preffix: 'webkit',
    transform: event => event,
  },
  {
    preffix: 'moz',
    transform: event => event,
  },
  {
    preffix: 'MS',
    transform: event => event,
  },
  {
    preffix: 'o',
    transform: event => event.toLowerCase(),
  },
  {
    preffix: '',
    transform: event => event.toLowerCase(),
  },
];

function addEventListener(element, type, callback) {
  pfx.forEach(({ preffix, transform }) => {
    element.addEventListener(`${preffix}${transform(type)}`, callback);
  });
}

function removeEventListener(element, type, callback) {
  pfx.forEach(({ preffix, transform }) => {
    element.removeEventListener(`${preffix}${transform(type)}`, callback);
  });
}

function useMoneyUpdate(initialValue, itemId) {
  const [value, updateValue] = useState(initialValue);

  function onTransitionEnd() {
    // value between 7 and 30
    updateValue(Math.round(Math.random() * 23 + 7));
  }

  useEffect(
    () => {
      const element = document.getElementById(itemId);
      if (element) {
        addEventListener(element, 'AnimationIteration', onTransitionEnd);
      }

      return () => {
        if (element) {
          removeEventListener(element, 'AnimationIteration', onTransitionEnd);
        }
      };
    },
    // empty array is for performance optimisation because of React watch on that parameter
    // and if it's not provided - run useEffect function each time component was updated
    [],
  );

  return value;
}

export default ProfileValue;
