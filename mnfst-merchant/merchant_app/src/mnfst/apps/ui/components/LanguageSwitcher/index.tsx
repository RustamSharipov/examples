import React from 'react';
import classNames from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';
import GlobusIcon from 'apps/ui/components/icons/Globus';
import { IClassNamesMap } from 'apps/ui/interfaces/elementNode';
import styles from './style.css';

interface ILanguage {
  lang: string;
  name: string;
}

interface IClassNames {
  caption: string;
  captionExpanded: string;
  icon: string;
}

interface ILanguageSwitcherProps {
  className?: string;
  classNamesMap: IClassNamesMap<IClassNames>;
  lang: string;
  languages: ILanguage[];
  onLanguageChange: (lang: string) => void;
}

interface ILanguageSwitcherState {
  isExpanded: boolean;
}

class LanguageSwitcher extends React.Component<ILanguageSwitcherProps, ILanguageSwitcherState> {
  public state = {
    isExpanded: false,
  };

  public handleClickOutside = () => {
    this.setState({
      isExpanded: false,
    });
  }

  public render() {
    const {
      className,
      classNamesMap = {},
      lang,
      languages,
    } = this.props;
    const { isExpanded } = this.state;

    return (
      <div
        className={classNames(
          styles.languageSwitcher,
          isExpanded && styles.isExpanded,
          className,
        )}>
        <div onClick={() => this.handleItemClick('en')} />
        <div
          className={classNames(
            styles.caption,
            classNamesMap.caption,
            isExpanded && classNamesMap.captionExpanded,
          )}
          onClick={this.handleCaptionClick}>
          <div className={styles.label}>
            {lang}
          </div>
          <GlobusIcon
            className={classNames(
              styles.icon,
              classNamesMap.icon,
            )} />
        </div>
        {/* ToDo: Find the reason why dropdown events doeen't work */}
        <div className={styles.dropdownListItems}>
          <div className={styles.items}>
            {languages.map(language => (
              <div
                key={language.lang}
                className={styles.item}
                onClick={() => this.handleItemClick(language.lang)}>
                {language.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  private handleCaptionClick = () => {
    this.setState(state => ({
      isExpanded: !state.isExpanded,
    }));
  }

  private handleItemClick = (lang: string) => {
    const { onLanguageChange } = this.props;
    if (onLanguageChange) {
      onLanguageChange(lang);
    }

    this.setState({
      isExpanded: false,
    });
  }
}

export default enhanceWithClickOutside(LanguageSwitcher);
