import { ERRORS_BASE, STATISTIC_UPDATE, STATISTIC_URI_GET } from 'constants/base';
import { reduceFormErrors } from 'utils/form';
import request from 'utils/request';

export function fetchData() {
  return async(dispatch) => {
    dispatch({
      type: STATISTIC_UPDATE,
      payload: {
        status: 'receiving',
      },
    });

    await request({
      method: 'GET',
      url: STATISTIC_URI_GET,
    })
      .then((response) => {
        const { data: { data }, status } = response;

        if (status === 200) {
          dispatch({
            type: STATISTIC_UPDATE,
            payload: {
              statistic: data,
              status: null,
            },
          });
        }
      })

      .catch((error= {}) => {
        dispatch({
          type: STATISTIC_UPDATE,
          payload: {
            status: 'error',
          },
        });

        if (error.message) {
          const errors = {
            statstic: [ERRORS_BASE.INTERNAL_SERVER_ERROR],
          };
          console.error(errors);
        }

        if (error.response) {
          const { data= {}, status } = error.response;

          // Return validation errors (server validation)
          if (status === 400 || status === 401) {
            const errors = reduceFormErrors(data.errors);
            console.error(errors);
          }

          // Internal server error cases
          if (status === 404 || status === 500) {
            const errors = {
              statstic: [ERRORS_BASE.INTERNAL_SERVER_ERROR],
            };
            console.error(errors);
          }
        }
      });
  };
}
