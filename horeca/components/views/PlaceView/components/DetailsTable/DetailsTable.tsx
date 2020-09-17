import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { InfoTable } from 'components/shared'

// @ts-ignore
import GeoPositionIcon from 'assets/icons/geoPosition.svg'
// @ts-ignore
import InfoIcon from 'assets/icons/info.svg'
// @ts-ignore
import IngredientsIcon from 'assets/icons/dish.svg'
// @ts-ignore
import PhoneIcon from 'assets/icons/phone.svg'
// @ts-ignore
import RecipeIcon from 'assets/icons/order.svg'
// @ts-ignore
import TimeIcon from 'assets/icons/time.svg'
// @ts-ignore
import WeigherIcon from 'assets/icons/weigher.svg'

type RowType = 'address' | 'phone' | 'workingHours' | 'info' | 'ingredients' | 'cookingTime' | 'calories' | 'recipe'

type RowField = {
  type: RowType,
  value: any,
}

interface IProps {
  items: RowField[]
}

const DetailsTable: FC<IProps> = ({ items }) => {
  const { t } = useTranslation()

  const renderRows = () => items.map(({ type, value }, index) => {
    if (value && value.length > 0) {
      switch (type) {
        case 'address':
          return (
            <InfoTable.Row
              key={index}
              icon={<GeoPositionIcon />}
              title={value}
            />
          )

        case 'phone':
          return (
            <InfoTable.Row
              key={index}
              icon={<PhoneIcon />}
              title={value}
            />
          )

        case 'workingHours':
          return (
            <InfoTable.Row
              key={index}
              icon={<InfoIcon />}
              title={value.join(' – ')}
            />
          )

        case 'ingredients':
          return (
            <InfoTable.Row
              key={index}
              icon={<IngredientsIcon />}
              title={value}
            />
          )

        case 'cookingTime':
          return (
            <InfoTable.Row
              key={index}
              icon={<TimeIcon />}
              title={value}
            />
          )

        case 'calories':
          return (
            <InfoTable.Row
              key={index}
              icon={<WeigherIcon />}
              title={value}
            />
          )

        case 'recipe':
          return (
            <InfoTable.Row
              key={index}
              icon={<RecipeIcon />}
              title={t('MenuDetailedInfo.TypeRecept')}
            />
          )

        case 'info':
          return (
            <InfoTable.Row
              key={index}
              icon={<InfoIcon />}
              title={t('PlaceDetailedInfo.Info')}
            >
              {value}
            </InfoTable.Row>
          )

        default:
          return null
      }
    }
  })

  return (
    <InfoTable>
      {renderRows()}
    </InfoTable>
  )
}

export default DetailsTable
