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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9kYXNoYm9hcmQuanN4IiwiZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgQm94LCBIMywgVGV4dCwgTG9hZGVyIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5cbmNvbnN0IENBUkRfU0hBRE9XID0gJzAgOHB4IDIwcHggcmdiYSgxNSwgMjMsIDQyLCAwLjA4KSc7XG5jb25zdCBDQVJEX0hPVkVSX1NIQURPVyA9ICcwIDE0cHggMzBweCByZ2JhKDE1LCAyMywgNDIsIDAuMTYpJztcblxuY29uc3QgcmVzb3VyY2VDYXJkU3R5bGVzID0ge1xuICBiZzogJ3doaXRlJyxcbiAgcDogJ3hsJyxcbiAgYm9yZGVyUmFkaXVzOiAnbGcnLFxuICBib3hTaGFkb3c6IENBUkRfU0hBRE9XLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDAuMTVzIGVhc2UsIGJveC1zaGFkb3cgMC4xNXMgZWFzZScsXG59O1xuXG5jb25zdCBEYXNoYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IFtjYXJkcywgc2V0Q2FyZHNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcblxuICAgIGFwaVxuICAgICAgLmdldERhc2hib2FyZCgpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIHNldENhcmRzKHJlc3BvbnNlPy5kYXRhPy5jYXJkcyA/PyBbXSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgc2V0RXJyb3IoZXJyb3IpO1xuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9KTtcbiAgfSwgW10pO1xuICByZXR1cm4gKFxuICAgIDxCb3ggdmFyaWFudD0nZ3JleSc+XG4gICAgICA8SDMgbXQ9J3hsJyBtYj0nbGcnPlxuICAgICAgICBPdmVydmlld1xuICAgICAgPC9IMz5cbiAgICAgIHtsb2FkaW5nICYmIDxMb2FkZXIgLz59XG4gICAgICB7ZXJyb3IgJiYgKFxuICAgICAgICA8Qm94IG10PSdsZycgcD0nbWQnIGJnPSdlcnJvckxpZ2h0JyBjb2xvcj0nZXJyb3InPlxuICAgICAgICAgIEZhaWxlZCB0byBsb2FkIGRhc2hib2FyZCBkYXRhLlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHshbG9hZGluZyAmJiAhZXJyb3IgJiYgKFxuICAgICAgICA8Qm94XG4gICAgICAgICAgZGlzcGxheT0nZ3JpZCdcbiAgICAgICAgICBncmlkR2FwPSd4bCdcbiAgICAgICAgICBncmlkVGVtcGxhdGVDb2x1bW5zPSdyZXBlYXQoYXV0by1maXQsIG1pbm1heCgyNDBweCwgMWZyKSknXG4gICAgICAgID5cbiAgICAgICAgICB7Y2FyZHMubWFwKGNhcmQgPT4gKFxuICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICBhcz0nYSdcbiAgICAgICAgICAgICAgaHJlZj17YC9hZG1pbi9yZXNvdXJjZXMvJHtjYXJkLnJlc291cmNlSWR9L2FjdGlvbnMvbGlzdGB9XG4gICAgICAgICAgICAgIGtleT17Y2FyZC5yZXNvdXJjZUlkfVxuICAgICAgICAgICAgICB7Li4ucmVzb3VyY2VDYXJkU3R5bGVzfVxuICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICAgICAgICAgIHRleHREZWNvcmF0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdpbmhlcml0JyxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXtldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgtMnB4KSc7XG4gICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5zdHlsZS5ib3hTaGFkb3cgPSBDQVJEX0hPVkVSX1NIQURPVztcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXtldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgwKSc7XG4gICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5zdHlsZS5ib3hTaGFkb3cgPSBDQVJEX1NIQURPVztcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFRleHQgZm9udFdlaWdodD0nYm9sZCcgbWI9J21kJz5cbiAgICAgICAgICAgICAgICB7Y2FyZC5sYWJlbH1cbiAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICA8VGV4dCBmb250U2l6ZT17MzJ9IG1iPSdtZCc+XG4gICAgICAgICAgICAgICAge2NhcmQuY291bnR9XG4gICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgPFRleHQgY29sb3I9J3ByaW1hcnkxMDAnPlZpZXcge2NhcmQubGFiZWx9PC9UZXh0PlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZDtcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fTtcbmltcG9ydCBSZXNvdXJjZUNhcmRzRGFzaGJvYXJkIGZyb20gJy4uL3NyYy9hZG1pbi9jb21wb25lbnRzL2Rhc2hib2FyZCc7XG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlJlc291cmNlQ2FyZHNEYXNoYm9hcmQgPSBSZXNvdXJjZUNhcmRzRGFzaGJvYXJkO1xuIl0sIm5hbWVzIjpbIkNBUkRfU0hBRE9XIiwiQ0FSRF9IT1ZFUl9TSEFET1ciLCJyZXNvdXJjZUNhcmRTdHlsZXMiLCJiZyIsInAiLCJib3JkZXJSYWRpdXMiLCJib3hTaGFkb3ciLCJkaXNwbGF5IiwiZmxleERpcmVjdGlvbiIsImp1c3RpZnlDb250ZW50IiwidHJhbnNpdGlvbiIsIkRhc2hib2FyZCIsImNhcmRzIiwic2V0Q2FyZHMiLCJ1c2VTdGF0ZSIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiZXJyb3IiLCJzZXRFcnJvciIsInVzZUVmZmVjdCIsImFwaSIsIkFwaUNsaWVudCIsImdldERhc2hib2FyZCIsInRoZW4iLCJyZXNwb25zZSIsImRhdGEiLCJjYXRjaCIsImZpbmFsbHkiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJCb3giLCJ2YXJpYW50IiwiSDMiLCJtdCIsIm1iIiwiTG9hZGVyIiwiY29sb3IiLCJncmlkR2FwIiwiZ3JpZFRlbXBsYXRlQ29sdW1ucyIsIm1hcCIsImNhcmQiLCJfZXh0ZW5kcyIsImFzIiwiaHJlZiIsInJlc291cmNlSWQiLCJrZXkiLCJzdHlsZSIsImN1cnNvciIsInRleHREZWNvcmF0aW9uIiwib25Nb3VzZUVudGVyIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwidHJhbnNmb3JtIiwib25Nb3VzZUxlYXZlIiwiVGV4dCIsImZvbnRXZWlnaHQiLCJsYWJlbCIsImZvbnRTaXplIiwiY291bnQiLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiLCJSZXNvdXJjZUNhcmRzRGFzaGJvYXJkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0VBSUEsTUFBTUEsV0FBVyxHQUFHLG1DQUFtQztFQUN2RCxNQUFNQyxpQkFBaUIsR0FBRyxvQ0FBb0M7RUFFOUQsTUFBTUMsa0JBQWtCLEdBQUc7RUFDekJDLEVBQUFBLEVBQUUsRUFBRSxPQUFPO0VBQ1hDLEVBQUFBLENBQUMsRUFBRSxJQUFJO0VBQ1BDLEVBQUFBLFlBQVksRUFBRSxJQUFJO0VBQ2xCQyxFQUFBQSxTQUFTLEVBQUVOLFdBQVc7RUFDdEJPLEVBQUFBLE9BQU8sRUFBRSxNQUFNO0VBQ2ZDLEVBQUFBLGFBQWEsRUFBRSxRQUFRO0VBQ3ZCQyxFQUFBQSxjQUFjLEVBQUUsZUFBZTtFQUMvQkMsRUFBQUEsVUFBVSxFQUFFO0VBQ2QsQ0FBQztFQUVELE1BQU1DLFNBQVMsR0FBR0EsTUFBTTtJQUN0QixNQUFNLENBQUNDLEtBQUssRUFBRUMsUUFBUSxDQUFDLEdBQUdDLGNBQVEsQ0FBQyxFQUFFLENBQUM7SUFDdEMsTUFBTSxDQUFDQyxPQUFPLEVBQUVDLFVBQVUsQ0FBQyxHQUFHRixjQUFRLENBQUMsSUFBSSxDQUFDO0lBQzVDLE1BQU0sQ0FBQ0csS0FBSyxFQUFFQyxRQUFRLENBQUMsR0FBR0osY0FBUSxDQUFDLElBQUksQ0FBQztFQUV4Q0ssRUFBQUEsZUFBUyxDQUFDLE1BQU07RUFDZCxJQUFBLE1BQU1DLEdBQUcsR0FBRyxJQUFJQyxpQkFBUyxFQUFFO01BRTNCRCxHQUFHLENBQ0FFLFlBQVksRUFBRSxDQUNkQyxJQUFJLENBQUNDLFFBQVEsSUFBSTtRQUNoQlgsUUFBUSxDQUFDVyxRQUFRLEVBQUVDLElBQUksRUFBRWIsS0FBSyxJQUFJLEVBQUUsQ0FBQztFQUN2QyxJQUFBLENBQUMsQ0FBQyxDQUNEYyxLQUFLLENBQUNULEtBQUssSUFBSTtRQUNkQyxRQUFRLENBQUNELEtBQUssQ0FBQztFQUNqQixJQUFBLENBQUMsQ0FBQyxDQUNEVSxPQUFPLENBQUMsTUFBTTtRQUNiWCxVQUFVLENBQUMsS0FBSyxDQUFDO0VBQ25CLElBQUEsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxFQUFFLEVBQUUsQ0FBQztFQUNOLEVBQUEsb0JBQ0VZLEtBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNDLElBQUFBLE9BQU8sRUFBQztFQUFNLEdBQUEsZUFDakJILEtBQUEsQ0FBQUMsYUFBQSxDQUFDRyxlQUFFLEVBQUE7RUFBQ0MsSUFBQUEsRUFBRSxFQUFDLElBQUk7RUFBQ0MsSUFBQUEsRUFBRSxFQUFDO0VBQUksR0FBQSxFQUFDLFVBRWhCLENBQUMsRUFDSm5CLE9BQU8saUJBQUlhLEtBQUEsQ0FBQUMsYUFBQSxDQUFDTSxtQkFBTSxFQUFBLElBQUUsQ0FBQyxFQUNyQmxCLEtBQUssaUJBQ0pXLEtBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNHLElBQUFBLEVBQUUsRUFBQyxJQUFJO0VBQUM3QixJQUFBQSxDQUFDLEVBQUMsSUFBSTtFQUFDRCxJQUFBQSxFQUFFLEVBQUMsWUFBWTtFQUFDaUMsSUFBQUEsS0FBSyxFQUFDO0VBQU8sR0FBQSxFQUFDLGdDQUU3QyxDQUNOLEVBRUEsQ0FBQ3JCLE9BQU8sSUFBSSxDQUFDRSxLQUFLLGlCQUNqQlcsS0FBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFDRnZCLElBQUFBLE9BQU8sRUFBQyxNQUFNO0VBQ2Q4QixJQUFBQSxPQUFPLEVBQUMsSUFBSTtFQUNaQyxJQUFBQSxtQkFBbUIsRUFBQztFQUFzQyxHQUFBLEVBRXpEMUIsS0FBSyxDQUFDMkIsR0FBRyxDQUFDQyxJQUFJLGlCQUNiWixLQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQVcsUUFBQSxDQUFBO0VBQ0ZDLElBQUFBLEVBQUUsRUFBQyxHQUFHO0VBQ05DLElBQUFBLElBQUksRUFBRSxDQUFBLGlCQUFBLEVBQW9CSCxJQUFJLENBQUNJLFVBQVUsQ0FBQSxhQUFBLENBQWdCO01BQ3pEQyxHQUFHLEVBQUVMLElBQUksQ0FBQ0k7RUFBVyxHQUFBLEVBQ2pCMUMsa0JBQWtCLEVBQUE7RUFDdEI0QyxJQUFBQSxLQUFLLEVBQUU7RUFDTEMsTUFBQUEsTUFBTSxFQUFFLFNBQVM7RUFDakJDLE1BQUFBLGNBQWMsRUFBRSxNQUFNO0VBQ3RCWixNQUFBQSxLQUFLLEVBQUU7T0FDUDtNQUNGYSxZQUFZLEVBQUVDLEtBQUssSUFBSTtFQUNyQkEsTUFBQUEsS0FBSyxDQUFDQyxhQUFhLENBQUNMLEtBQUssQ0FBQ00sU0FBUyxHQUFHLGtCQUFrQjtFQUN4REYsTUFBQUEsS0FBSyxDQUFDQyxhQUFhLENBQUNMLEtBQUssQ0FBQ3hDLFNBQVMsR0FBR0wsaUJBQWlCO01BQ3pELENBQUU7TUFDRm9ELFlBQVksRUFBRUgsS0FBSyxJQUFJO0VBQ3JCQSxNQUFBQSxLQUFLLENBQUNDLGFBQWEsQ0FBQ0wsS0FBSyxDQUFDTSxTQUFTLEdBQUcsZUFBZTtFQUNyREYsTUFBQUEsS0FBSyxDQUFDQyxhQUFhLENBQUNMLEtBQUssQ0FBQ3hDLFNBQVMsR0FBR04sV0FBVztFQUNuRCxJQUFBO0VBQUUsR0FBQSxDQUFBLGVBRUY0QixLQUFBLENBQUFDLGFBQUEsQ0FBQ3lCLGlCQUFJLEVBQUE7RUFBQ0MsSUFBQUEsVUFBVSxFQUFDLE1BQU07RUFBQ3JCLElBQUFBLEVBQUUsRUFBQztLQUFJLEVBQzVCTSxJQUFJLENBQUNnQixLQUNGLENBQUMsZUFDUDVCLEtBQUEsQ0FBQUMsYUFBQSxDQUFDeUIsaUJBQUksRUFBQTtFQUFDRyxJQUFBQSxRQUFRLEVBQUUsRUFBRztFQUFDdkIsSUFBQUEsRUFBRSxFQUFDO0tBQUksRUFDeEJNLElBQUksQ0FBQ2tCLEtBQ0YsQ0FBQyxlQUNQOUIsS0FBQSxDQUFBQyxhQUFBLENBQUN5QixpQkFBSSxFQUFBO0VBQUNsQixJQUFBQSxLQUFLLEVBQUM7S0FBWSxFQUFDLE9BQUssRUFBQ0ksSUFBSSxDQUFDZ0IsS0FBWSxDQUM3QyxDQUNOLENBQ0UsQ0FFSixDQUFDO0VBRVYsQ0FBQzs7RUN6RkRHLE9BQU8sQ0FBQ0MsY0FBYyxHQUFHLEVBQUU7RUFFM0JELE9BQU8sQ0FBQ0MsY0FBYyxDQUFDQyxzQkFBc0IsR0FBR0EsU0FBc0I7Ozs7OzsifQ==
