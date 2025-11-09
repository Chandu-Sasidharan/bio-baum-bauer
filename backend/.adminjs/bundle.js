(function (react, adminjs, designSystem) {
  'use strict';

  function _extends() {
    return (
      (_extends = Object.assign
        ? Object.assign.bind()
        : function (n) {
            for (var e = 1; e < arguments.length; e++) {
              var t = arguments[e];
              for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
            }
            return n;
          }),
      _extends.apply(null, arguments)
    );
  }

  const CARD_SHADOW = '0 8px 20px rgba(15, 23, 42, 0.08)';
  const CARD_HOVER_SHADOW = '0 14px 30px rgba(15, 23, 42, 0.16)';
  const resourceCardStyles = {
    bg: 'white',
    p: 'xl',
    borderRadius: 'lg',
    boxShadow: CARD_SHADOW,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  };
  const Dashboard = () => {
    const [cards, setCards] = react.useState([]);
    const [loading, setLoading] = react.useState(true);
    const [error, setError] = react.useState(null);
    react.useEffect(() => {
      const api = new adminjs.ApiClient();
      api
        .getDashboard()
        .then(response => {
          setCards(response?.data?.cards ?? []);
        })
        .catch(error => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);
    return /*#__PURE__*/ React.createElement(
      designSystem.Box,
      {
        variant: 'grey',
      },
      /*#__PURE__*/ React.createElement(
        designSystem.H3,
        {
          mt: 'xl',
          mb: 'lg',
        },
        'Overview'
      ),
      loading && /*#__PURE__*/ React.createElement(designSystem.Loader, null),
      error &&
        /*#__PURE__*/ React.createElement(
          designSystem.Box,
          {
            mt: 'lg',
            p: 'md',
            bg: 'errorLight',
            color: 'error',
          },
          'Failed to load dashboard data.'
        ),
      !loading &&
        !error &&
        /*#__PURE__*/ React.createElement(
          designSystem.Box,
          {
            display: 'grid',
            gridGap: 'xl',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          },
          cards.map(card =>
            /*#__PURE__*/ React.createElement(
              designSystem.Box,
              _extends(
                {
                  as: 'a',
                  href: `/admin/resources/${card.resourceId}/actions/list`,
                  key: card.resourceId,
                },
                resourceCardStyles,
                {
                  style: {
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: 'inherit',
                  },
                  onMouseEnter: event => {
                    event.currentTarget.style.transform = 'translateY(-2px)';
                    event.currentTarget.style.boxShadow = CARD_HOVER_SHADOW;
                  },
                  onMouseLeave: event => {
                    event.currentTarget.style.transform = 'translateY(0)';
                    event.currentTarget.style.boxShadow = CARD_SHADOW;
                  },
                }
              ),
              /*#__PURE__*/ React.createElement(
                designSystem.Text,
                {
                  fontWeight: 'bold',
                  mb: 'md',
                },
                card.label
              ),
              /*#__PURE__*/ React.createElement(
                designSystem.Text,
                {
                  fontSize: 32,
                  mb: 'md',
                },
                card.count
              ),
              /*#__PURE__*/ React.createElement(
                designSystem.Text,
                {
                  color: 'primary100',
                },
                'View ',
                card.label
              )
            )
          )
        )
    );
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.ResourceCardsDashboard = Dashboard;
})(React, AdminJS, AdminJSDesignSystem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9kYXNoYm9hcmQuanN4IiwiZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgQm94LCBIMywgVGV4dCwgTG9hZGVyIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5cbmNvbnN0IENBUkRfU0hBRE9XID0gJzAgOHB4IDIwcHggcmdiYSgxNSwgMjMsIDQyLCAwLjA4KSc7XG5jb25zdCBDQVJEX0hPVkVSX1NIQURPVyA9ICcwIDE0cHggMzBweCByZ2JhKDE1LCAyMywgNDIsIDAuMTYpJztcblxuY29uc3QgcmVzb3VyY2VDYXJkU3R5bGVzID0ge1xuICBiZzogJ3doaXRlJyxcbiAgcDogJ3hsJyxcbiAgYm9yZGVyUmFkaXVzOiAnbGcnLFxuICBib3hTaGFkb3c6IENBUkRfU0hBRE9XLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDAuMTVzIGVhc2UsIGJveC1zaGFkb3cgMC4xNXMgZWFzZScsXG59O1xuXG5jb25zdCBEYXNoYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IFtjYXJkcywgc2V0Q2FyZHNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcblxuICAgIGFwaVxuICAgICAgLmdldERhc2hib2FyZCgpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIHNldENhcmRzKHJlc3BvbnNlPy5kYXRhPy5jYXJkcyA/PyBbXSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgc2V0RXJyb3IoZXJyb3IpO1xuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9KTtcbiAgfSwgW10pO1xuICByZXR1cm4gKFxuICAgIDxCb3ggdmFyaWFudD0nZ3JleSc+XG4gICAgICA8SDMgbXQ9J3hsJyBtYj0nbGcnPlxuICAgICAgICBPdmVydmlld1xuICAgICAgPC9IMz5cbiAgICAgIHtsb2FkaW5nICYmIDxMb2FkZXIgLz59XG4gICAgICB7ZXJyb3IgJiYgKFxuICAgICAgICA8Qm94IG10PSdsZycgcD0nbWQnIGJnPSdlcnJvckxpZ2h0JyBjb2xvcj0nZXJyb3InPlxuICAgICAgICAgIEZhaWxlZCB0byBsb2FkIGRhc2hib2FyZCBkYXRhLlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHshbG9hZGluZyAmJiAhZXJyb3IgJiYgKFxuICAgICAgICA8Qm94XG4gICAgICAgICAgZGlzcGxheT0nZ3JpZCdcbiAgICAgICAgICBncmlkR2FwPSd4bCdcbiAgICAgICAgICBncmlkVGVtcGxhdGVDb2x1bW5zPSdyZXBlYXQoYXV0by1maXQsIG1pbm1heCgyNDBweCwgMWZyKSknXG4gICAgICAgID5cbiAgICAgICAgICB7Y2FyZHMubWFwKGNhcmQgPT4gKFxuICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICBhcz0nYSdcbiAgICAgICAgICAgICAgaHJlZj17YC9hZG1pbi9yZXNvdXJjZXMvJHtjYXJkLnJlc291cmNlSWR9L2FjdGlvbnMvbGlzdGB9XG4gICAgICAgICAgICAgIGtleT17Y2FyZC5yZXNvdXJjZUlkfVxuICAgICAgICAgICAgICB7Li4ucmVzb3VyY2VDYXJkU3R5bGVzfVxuICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICAgICAgICAgIHRleHREZWNvcmF0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdpbmhlcml0JyxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXtldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgtMnB4KSc7XG4gICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5zdHlsZS5ib3hTaGFkb3cgPSBDQVJEX0hPVkVSX1NIQURPVztcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXtldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgwKSc7XG4gICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5zdHlsZS5ib3hTaGFkb3cgPSBDQVJEX1NIQURPVztcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFRleHQgZm9udFdlaWdodD0nYm9sZCcgbWI9J21kJz5cbiAgICAgICAgICAgICAgICB7Y2FyZC5sYWJlbH1cbiAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICA8VGV4dCBmb250U2l6ZT17MzJ9IG1iPSdtZCc+XG4gICAgICAgICAgICAgICAge2NhcmQuY291bnR9XG4gICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgPFRleHQgY29sb3I9J3ByaW1hcnkxMDAnPlZpZXcge2NhcmQubGFiZWx9PC9UZXh0PlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZDtcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IFJlc291cmNlQ2FyZHNEYXNoYm9hcmQgZnJvbSAnLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvZGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5SZXNvdXJjZUNhcmRzRGFzaGJvYXJkID0gUmVzb3VyY2VDYXJkc0Rhc2hib2FyZCJdLCJuYW1lcyI6WyJDQVJEX1NIQURPVyIsIkNBUkRfSE9WRVJfU0hBRE9XIiwicmVzb3VyY2VDYXJkU3R5bGVzIiwiYmciLCJwIiwiYm9yZGVyUmFkaXVzIiwiYm94U2hhZG93IiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJqdXN0aWZ5Q29udGVudCIsInRyYW5zaXRpb24iLCJEYXNoYm9hcmQiLCJjYXJkcyIsInNldENhcmRzIiwidXNlU3RhdGUiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImVycm9yIiwic2V0RXJyb3IiLCJ1c2VFZmZlY3QiLCJhcGkiLCJBcGlDbGllbnQiLCJnZXREYXNoYm9hcmQiLCJ0aGVuIiwicmVzcG9uc2UiLCJkYXRhIiwiY2F0Y2giLCJmaW5hbGx5IiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiQm94IiwidmFyaWFudCIsIkgzIiwibXQiLCJtYiIsIkxvYWRlciIsImNvbG9yIiwiZ3JpZEdhcCIsImdyaWRUZW1wbGF0ZUNvbHVtbnMiLCJtYXAiLCJjYXJkIiwiX2V4dGVuZHMiLCJhcyIsImhyZWYiLCJyZXNvdXJjZUlkIiwia2V5Iiwic3R5bGUiLCJjdXJzb3IiLCJ0ZXh0RGVjb3JhdGlvbiIsIm9uTW91c2VFbnRlciIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsInRyYW5zZm9ybSIsIm9uTW91c2VMZWF2ZSIsIlRleHQiLCJmb250V2VpZ2h0IiwibGFiZWwiLCJmb250U2l6ZSIsImNvdW50IiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIiwiUmVzb3VyY2VDYXJkc0Rhc2hib2FyZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztFQUlBLE1BQU1BLFdBQVcsR0FBRyxtQ0FBbUM7RUFDdkQsTUFBTUMsaUJBQWlCLEdBQUcsb0NBQW9DO0VBRTlELE1BQU1DLGtCQUFrQixHQUFHO0VBQ3pCQyxFQUFBQSxFQUFFLEVBQUUsT0FBTztFQUNYQyxFQUFBQSxDQUFDLEVBQUUsSUFBSTtFQUNQQyxFQUFBQSxZQUFZLEVBQUUsSUFBSTtFQUNsQkMsRUFBQUEsU0FBUyxFQUFFTixXQUFXO0VBQ3RCTyxFQUFBQSxPQUFPLEVBQUUsTUFBTTtFQUNmQyxFQUFBQSxhQUFhLEVBQUUsUUFBUTtFQUN2QkMsRUFBQUEsY0FBYyxFQUFFLGVBQWU7RUFDL0JDLEVBQUFBLFVBQVUsRUFBRTtFQUNkLENBQUM7RUFFRCxNQUFNQyxTQUFTLEdBQUdBLE1BQU07SUFDdEIsTUFBTSxDQUFDQyxLQUFLLEVBQUVDLFFBQVEsQ0FBQyxHQUFHQyxjQUFRLENBQUMsRUFBRSxDQUFDO0lBQ3RDLE1BQU0sQ0FBQ0MsT0FBTyxFQUFFQyxVQUFVLENBQUMsR0FBR0YsY0FBUSxDQUFDLElBQUksQ0FBQztJQUM1QyxNQUFNLENBQUNHLEtBQUssRUFBRUMsUUFBUSxDQUFDLEdBQUdKLGNBQVEsQ0FBQyxJQUFJLENBQUM7RUFFeENLLEVBQUFBLGVBQVMsQ0FBQyxNQUFNO0VBQ2QsSUFBQSxNQUFNQyxHQUFHLEdBQUcsSUFBSUMsaUJBQVMsRUFBRTtNQUUzQkQsR0FBRyxDQUNBRSxZQUFZLEVBQUUsQ0FDZEMsSUFBSSxDQUFDQyxRQUFRLElBQUk7UUFDaEJYLFFBQVEsQ0FBQ1csUUFBUSxFQUFFQyxJQUFJLEVBQUViLEtBQUssSUFBSSxFQUFFLENBQUM7RUFDdkMsSUFBQSxDQUFDLENBQUMsQ0FDRGMsS0FBSyxDQUFDVCxLQUFLLElBQUk7UUFDZEMsUUFBUSxDQUFDRCxLQUFLLENBQUM7RUFDakIsSUFBQSxDQUFDLENBQUMsQ0FDRFUsT0FBTyxDQUFDLE1BQU07UUFDYlgsVUFBVSxDQUFDLEtBQUssQ0FBQztFQUNuQixJQUFBLENBQUMsQ0FBQztJQUNOLENBQUMsRUFBRSxFQUFFLENBQUM7RUFDTixFQUFBLG9CQUNFWSxLQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUFDQyxJQUFBQSxPQUFPLEVBQUM7RUFBTSxHQUFBLGVBQ2pCSCxLQUFBLENBQUFDLGFBQUEsQ0FBQ0csZUFBRSxFQUFBO0VBQUNDLElBQUFBLEVBQUUsRUFBQyxJQUFJO0VBQUNDLElBQUFBLEVBQUUsRUFBQztFQUFJLEdBQUEsRUFBQyxVQUVoQixDQUFDLEVBQ0puQixPQUFPLGlCQUFJYSxLQUFBLENBQUFDLGFBQUEsQ0FBQ00sbUJBQU0sRUFBQSxJQUFFLENBQUMsRUFDckJsQixLQUFLLGlCQUNKVyxLQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUFDRyxJQUFBQSxFQUFFLEVBQUMsSUFBSTtFQUFDN0IsSUFBQUEsQ0FBQyxFQUFDLElBQUk7RUFBQ0QsSUFBQUEsRUFBRSxFQUFDLFlBQVk7RUFBQ2lDLElBQUFBLEtBQUssRUFBQztFQUFPLEdBQUEsRUFBQyxnQ0FFN0MsQ0FDTixFQUVBLENBQUNyQixPQUFPLElBQUksQ0FBQ0UsS0FBSyxpQkFDakJXLEtBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQ0Z2QixJQUFBQSxPQUFPLEVBQUMsTUFBTTtFQUNkOEIsSUFBQUEsT0FBTyxFQUFDLElBQUk7RUFDWkMsSUFBQUEsbUJBQW1CLEVBQUM7RUFBc0MsR0FBQSxFQUV6RDFCLEtBQUssQ0FBQzJCLEdBQUcsQ0FBQ0MsSUFBSSxpQkFDYlosS0FBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUFXLFFBQUEsQ0FBQTtFQUNGQyxJQUFBQSxFQUFFLEVBQUMsR0FBRztFQUNOQyxJQUFBQSxJQUFJLEVBQUUsQ0FBQSxpQkFBQSxFQUFvQkgsSUFBSSxDQUFDSSxVQUFVLENBQUEsYUFBQSxDQUFnQjtNQUN6REMsR0FBRyxFQUFFTCxJQUFJLENBQUNJO0VBQVcsR0FBQSxFQUNqQjFDLGtCQUFrQixFQUFBO0VBQ3RCNEMsSUFBQUEsS0FBSyxFQUFFO0VBQ0xDLE1BQUFBLE1BQU0sRUFBRSxTQUFTO0VBQ2pCQyxNQUFBQSxjQUFjLEVBQUUsTUFBTTtFQUN0QlosTUFBQUEsS0FBSyxFQUFFO09BQ1A7TUFDRmEsWUFBWSxFQUFFQyxLQUFLLElBQUk7RUFDckJBLE1BQUFBLEtBQUssQ0FBQ0MsYUFBYSxDQUFDTCxLQUFLLENBQUNNLFNBQVMsR0FBRyxrQkFBa0I7RUFDeERGLE1BQUFBLEtBQUssQ0FBQ0MsYUFBYSxDQUFDTCxLQUFLLENBQUN4QyxTQUFTLEdBQUdMLGlCQUFpQjtNQUN6RCxDQUFFO01BQ0ZvRCxZQUFZLEVBQUVILEtBQUssSUFBSTtFQUNyQkEsTUFBQUEsS0FBSyxDQUFDQyxhQUFhLENBQUNMLEtBQUssQ0FBQ00sU0FBUyxHQUFHLGVBQWU7RUFDckRGLE1BQUFBLEtBQUssQ0FBQ0MsYUFBYSxDQUFDTCxLQUFLLENBQUN4QyxTQUFTLEdBQUdOLFdBQVc7RUFDbkQsSUFBQTtFQUFFLEdBQUEsQ0FBQSxlQUVGNEIsS0FBQSxDQUFBQyxhQUFBLENBQUN5QixpQkFBSSxFQUFBO0VBQUNDLElBQUFBLFVBQVUsRUFBQyxNQUFNO0VBQUNyQixJQUFBQSxFQUFFLEVBQUM7S0FBSSxFQUM1Qk0sSUFBSSxDQUFDZ0IsS0FDRixDQUFDLGVBQ1A1QixLQUFBLENBQUFDLGFBQUEsQ0FBQ3lCLGlCQUFJLEVBQUE7RUFBQ0csSUFBQUEsUUFBUSxFQUFFLEVBQUc7RUFBQ3ZCLElBQUFBLEVBQUUsRUFBQztLQUFJLEVBQ3hCTSxJQUFJLENBQUNrQixLQUNGLENBQUMsZUFDUDlCLEtBQUEsQ0FBQUMsYUFBQSxDQUFDeUIsaUJBQUksRUFBQTtFQUFDbEIsSUFBQUEsS0FBSyxFQUFDO0tBQVksRUFBQyxPQUFLLEVBQUNJLElBQUksQ0FBQ2dCLEtBQVksQ0FDN0MsQ0FDTixDQUNFLENBRUosQ0FBQztFQUVWLENBQUM7O0VDekZERyxPQUFPLENBQUNDLGNBQWMsR0FBRyxFQUFFO0VBRTNCRCxPQUFPLENBQUNDLGNBQWMsQ0FBQ0Msc0JBQXNCLEdBQUdBLFNBQXNCOzs7Ozs7In0=
