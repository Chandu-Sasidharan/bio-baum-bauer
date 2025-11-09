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

  const resourceCardStyles = {
    bg: 'white',
    p: 'xl',
    borderRadius: 'lg',
    boxShadow: 'card',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
                  key: card.resourceId,
                },
                resourceCardStyles
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
                designSystem.Link,
                {
                  href: `/admin/resources/${card.resourceId}`,
                  variant: 'primary',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9kYXNoYm9hcmQuanN4IiwiZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgQm94LCBIMywgVGV4dCwgTGluaywgTG9hZGVyIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5cbmNvbnN0IHJlc291cmNlQ2FyZFN0eWxlcyA9IHtcbiAgYmc6ICd3aGl0ZScsXG4gIHA6ICd4bCcsXG4gIGJvcmRlclJhZGl1czogJ2xnJyxcbiAgYm94U2hhZG93OiAnY2FyZCcsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG59O1xuXG5jb25zdCBEYXNoYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IFtjYXJkcywgc2V0Q2FyZHNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcblxuICAgIGFwaVxuICAgICAgLmdldERhc2hib2FyZCgpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIHNldENhcmRzKHJlc3BvbnNlPy5kYXRhPy5jYXJkcyA/PyBbXSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgc2V0RXJyb3IoZXJyb3IpO1xuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9KTtcbiAgfSwgW10pO1xuICByZXR1cm4gKFxuICAgIDxCb3ggdmFyaWFudD0nZ3JleSc+XG4gICAgICA8SDMgbXQ9J3hsJyBtYj0nbGcnPlxuICAgICAgICBPdmVydmlld1xuICAgICAgPC9IMz5cbiAgICAgIHtsb2FkaW5nICYmIDxMb2FkZXIgLz59XG4gICAgICB7ZXJyb3IgJiYgKFxuICAgICAgICA8Qm94IG10PSdsZycgcD0nbWQnIGJnPSdlcnJvckxpZ2h0JyBjb2xvcj0nZXJyb3InPlxuICAgICAgICAgIEZhaWxlZCB0byBsb2FkIGRhc2hib2FyZCBkYXRhLlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG5cbiAgICAgIHshbG9hZGluZyAmJiAhZXJyb3IgJiYgKFxuICAgICAgICA8Qm94XG4gICAgICAgICAgZGlzcGxheT0nZ3JpZCdcbiAgICAgICAgICBncmlkR2FwPSd4bCdcbiAgICAgICAgICBncmlkVGVtcGxhdGVDb2x1bW5zPSdyZXBlYXQoYXV0by1maXQsIG1pbm1heCgyNDBweCwgMWZyKSknXG4gICAgICAgID5cbiAgICAgICAgICB7Y2FyZHMubWFwKGNhcmQgPT4gKFxuICAgICAgICAgICAgPEJveCBrZXk9e2NhcmQucmVzb3VyY2VJZH0gey4uLnJlc291cmNlQ2FyZFN0eWxlc30+XG4gICAgICAgICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9J2JvbGQnIG1iPSdtZCc+XG4gICAgICAgICAgICAgICAge2NhcmQubGFiZWx9XG4gICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgPFRleHQgZm9udFNpemU9ezMyfSBtYj0nbWQnPlxuICAgICAgICAgICAgICAgIHtjYXJkLmNvdW50fVxuICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICAgICAgaHJlZj17YC9hZG1pbi9yZXNvdXJjZXMvJHtjYXJkLnJlc291cmNlSWR9YH1cbiAgICAgICAgICAgICAgICB2YXJpYW50PSdwcmltYXJ5J1xuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgVmlldyB7Y2FyZC5sYWJlbH1cbiAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZDtcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IFJlc291cmNlQ2FyZHNEYXNoYm9hcmQgZnJvbSAnLi4vc3JjL2FkbWluL2NvbXBvbmVudHMvZGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5SZXNvdXJjZUNhcmRzRGFzaGJvYXJkID0gUmVzb3VyY2VDYXJkc0Rhc2hib2FyZCJdLCJuYW1lcyI6WyJyZXNvdXJjZUNhcmRTdHlsZXMiLCJiZyIsInAiLCJib3JkZXJSYWRpdXMiLCJib3hTaGFkb3ciLCJkaXNwbGF5IiwiZmxleERpcmVjdGlvbiIsImp1c3RpZnlDb250ZW50IiwiRGFzaGJvYXJkIiwiY2FyZHMiLCJzZXRDYXJkcyIsInVzZVN0YXRlIiwibG9hZGluZyIsInNldExvYWRpbmciLCJlcnJvciIsInNldEVycm9yIiwidXNlRWZmZWN0IiwiYXBpIiwiQXBpQ2xpZW50IiwiZ2V0RGFzaGJvYXJkIiwidGhlbiIsInJlc3BvbnNlIiwiZGF0YSIsImNhdGNoIiwiZmluYWxseSIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIkJveCIsInZhcmlhbnQiLCJIMyIsIm10IiwibWIiLCJMb2FkZXIiLCJjb2xvciIsImdyaWRHYXAiLCJncmlkVGVtcGxhdGVDb2x1bW5zIiwibWFwIiwiY2FyZCIsIl9leHRlbmRzIiwia2V5IiwicmVzb3VyY2VJZCIsIlRleHQiLCJmb250V2VpZ2h0IiwibGFiZWwiLCJmb250U2l6ZSIsImNvdW50IiwiTGluayIsImhyZWYiLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiLCJSZXNvdXJjZUNhcmRzRGFzaGJvYXJkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0VBSUEsTUFBTUEsa0JBQWtCLEdBQUc7RUFDekJDLEVBQUFBLEVBQUUsRUFBRSxPQUFPO0VBQ1hDLEVBQUFBLENBQUMsRUFBRSxJQUFJO0VBQ1BDLEVBQUFBLFlBQVksRUFBRSxJQUFJO0VBQ2xCQyxFQUFBQSxTQUFTLEVBQUUsTUFBTTtFQUNqQkMsRUFBQUEsT0FBTyxFQUFFLE1BQU07RUFDZkMsRUFBQUEsYUFBYSxFQUFFLFFBQVE7RUFDdkJDLEVBQUFBLGNBQWMsRUFBRTtFQUNsQixDQUFDO0VBRUQsTUFBTUMsU0FBUyxHQUFHQSxNQUFNO0lBQ3RCLE1BQU0sQ0FBQ0MsS0FBSyxFQUFFQyxRQUFRLENBQUMsR0FBR0MsY0FBUSxDQUFDLEVBQUUsQ0FBQztJQUN0QyxNQUFNLENBQUNDLE9BQU8sRUFBRUMsVUFBVSxDQUFDLEdBQUdGLGNBQVEsQ0FBQyxJQUFJLENBQUM7SUFDNUMsTUFBTSxDQUFDRyxLQUFLLEVBQUVDLFFBQVEsQ0FBQyxHQUFHSixjQUFRLENBQUMsSUFBSSxDQUFDO0VBRXhDSyxFQUFBQSxlQUFTLENBQUMsTUFBTTtFQUNkLElBQUEsTUFBTUMsR0FBRyxHQUFHLElBQUlDLGlCQUFTLEVBQUU7TUFFM0JELEdBQUcsQ0FDQUUsWUFBWSxFQUFFLENBQ2RDLElBQUksQ0FBQ0MsUUFBUSxJQUFJO1FBQ2hCWCxRQUFRLENBQUNXLFFBQVEsRUFBRUMsSUFBSSxFQUFFYixLQUFLLElBQUksRUFBRSxDQUFDO0VBQ3ZDLElBQUEsQ0FBQyxDQUFDLENBQ0RjLEtBQUssQ0FBQ1QsS0FBSyxJQUFJO1FBQ2RDLFFBQVEsQ0FBQ0QsS0FBSyxDQUFDO0VBQ2pCLElBQUEsQ0FBQyxDQUFDLENBQ0RVLE9BQU8sQ0FBQyxNQUFNO1FBQ2JYLFVBQVUsQ0FBQyxLQUFLLENBQUM7RUFDbkIsSUFBQSxDQUFDLENBQUM7SUFDTixDQUFDLEVBQUUsRUFBRSxDQUFDO0VBQ04sRUFBQSxvQkFDRVksS0FBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ0MsSUFBQUEsT0FBTyxFQUFDO0VBQU0sR0FBQSxlQUNqQkgsS0FBQSxDQUFBQyxhQUFBLENBQUNHLGVBQUUsRUFBQTtFQUFDQyxJQUFBQSxFQUFFLEVBQUMsSUFBSTtFQUFDQyxJQUFBQSxFQUFFLEVBQUM7RUFBSSxHQUFBLEVBQUMsVUFFaEIsQ0FBQyxFQUNKbkIsT0FBTyxpQkFBSWEsS0FBQSxDQUFBQyxhQUFBLENBQUNNLG1CQUFNLEVBQUEsSUFBRSxDQUFDLEVBQ3JCbEIsS0FBSyxpQkFDSlcsS0FBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ0csSUFBQUEsRUFBRSxFQUFDLElBQUk7RUFBQzVCLElBQUFBLENBQUMsRUFBQyxJQUFJO0VBQUNELElBQUFBLEVBQUUsRUFBQyxZQUFZO0VBQUNnQyxJQUFBQSxLQUFLLEVBQUM7RUFBTyxHQUFBLEVBQUMsZ0NBRTdDLENBQ04sRUFFQSxDQUFDckIsT0FBTyxJQUFJLENBQUNFLEtBQUssaUJBQ2pCVyxLQUFBLENBQUFDLGFBQUEsQ0FBQ0MsZ0JBQUcsRUFBQTtFQUNGdEIsSUFBQUEsT0FBTyxFQUFDLE1BQU07RUFDZDZCLElBQUFBLE9BQU8sRUFBQyxJQUFJO0VBQ1pDLElBQUFBLG1CQUFtQixFQUFDO0VBQXNDLEdBQUEsRUFFekQxQixLQUFLLENBQUMyQixHQUFHLENBQUNDLElBQUksaUJBQ2JaLEtBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBVyxRQUFBLENBQUE7TUFBQ0MsR0FBRyxFQUFFRixJQUFJLENBQUNHO0VBQVcsR0FBQSxFQUFLeEMsa0JBQWtCLENBQUEsZUFDL0N5QixLQUFBLENBQUFDLGFBQUEsQ0FBQ2UsaUJBQUksRUFBQTtFQUFDQyxJQUFBQSxVQUFVLEVBQUMsTUFBTTtFQUFDWCxJQUFBQSxFQUFFLEVBQUM7S0FBSSxFQUM1Qk0sSUFBSSxDQUFDTSxLQUNGLENBQUMsZUFDUGxCLEtBQUEsQ0FBQUMsYUFBQSxDQUFDZSxpQkFBSSxFQUFBO0VBQUNHLElBQUFBLFFBQVEsRUFBRSxFQUFHO0VBQUNiLElBQUFBLEVBQUUsRUFBQztLQUFJLEVBQ3hCTSxJQUFJLENBQUNRLEtBQ0YsQ0FBQyxlQUNQcEIsS0FBQSxDQUFBQyxhQUFBLENBQUNvQixpQkFBSSxFQUFBO0VBQ0hDLElBQUFBLElBQUksRUFBRSxDQUFBLGlCQUFBLEVBQW9CVixJQUFJLENBQUNHLFVBQVUsQ0FBQSxDQUFHO0VBQzVDWixJQUFBQSxPQUFPLEVBQUM7S0FBUyxFQUNsQixPQUNNLEVBQUNTLElBQUksQ0FBQ00sS0FDUCxDQUNILENBQ04sQ0FDRSxDQUVKLENBQUM7RUFFVixDQUFDOztFQ3hFREssT0FBTyxDQUFDQyxjQUFjLEdBQUcsRUFBRTtFQUUzQkQsT0FBTyxDQUFDQyxjQUFjLENBQUNDLHNCQUFzQixHQUFHQSxTQUFzQjs7Ozs7OyJ9
