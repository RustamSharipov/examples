import { NextApiRequest, NextApiResponse } from 'next'

import { getMenuItems } from 'api/menus'

import { createMenu } from 'api/models'

export default async(request: NextApiRequest, response: NextApiResponse) => {
  try {
    const menuCategories = await getMenuItems()  
    const data = menuCategories.map(menuCategory => createMenu(menuCategory))

    response
      .status(200)
      .json(data)
  }

  catch (error) {
    response.json(error)
  }
}
