import Countries from 'countries-api';
import { minimalTimezoneSet } from 'compact-timezone-list';
import FlagIcon from 'apps/ui/components/FlagIcon';

interface IGetAllCountriesParams {
  withFlags?: boolean;
}

interface IGetCountryParams {
  cca2?: string;
}

export class Regions {
  public static getAllCountries(props: IGetAllCountriesParams = {}) {
    const { withFlags } = props;
    const countries = Countries.findAll();

    return countries.data.map((country) => {
      return {
        ...(withFlags && { iconBefore: FlagIcon({ countryCode: country.cca2 }) }),
        callingCode: country.callingCode,
        name: country.name.common,
        value: country.cca2,
      };
    });
  }

  public static getCountries(params: IGetCountryParams) {
    const { cca2 } = params;
    return Countries.findAll().data.filter(country => country.cca2 === cca2) || null;
  }

  public static getAllTimezones() {
    return minimalTimezoneSet.map(timezone => ({
      name: timezone.label,
      value: timezone.label,
    }));
  }
}
