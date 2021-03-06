import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// material-ui components
import { withStyles, Card, CardContent, CardHeader, CardActions } from "@material-ui/core";


import headerCardStyle from "assets/jss/material-dashboard-pro-react/components/headerCardStyle";

function HeaderCard({ ...props }) {
  const {
    classes,
    headerColor,
    plainCard,
    cardTitle,
    cardSubtitle,
    content,
    footer,
    footerAlign
  } = props;
  const plainCardClasses = cx({
    [" " + classes.cardPlain]: plainCard
  });
  const cardPlainHeaderClasses = cx({
    [" " + classes.cardPlainHeader]: plainCard
  });
  const cardFooterClasses =
    classes.cardActions +
    "  " +
    cx({
      [classes[footerAlign]]: footerAlign !== undefined
    });
  return (
    <Card className={classes.card + plainCardClasses}>
      <CardHeader
        classes={{
          root:
            classes.cardHeader +
            " " +
            classes[headerColor + "CardHeader"] +
            cardPlainHeaderClasses,
          title: classes.cardTitle,
          subheader: classes.cardSubtitle
        }}
        title={cardTitle}
        subheader={cardSubtitle}
      />
      <CardContent className={classes.cardContent}>{content}</CardContent>
      {footer !== undefined ? (
        <CardActions className={cardFooterClasses}>{footer}</CardActions>
      ) : null}
    </Card>
  );
}

HeaderCard.defaultProps = {
  headerColor: "purple"
};

HeaderCard.propTypes = {
  plainCard: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  headerColor: PropTypes.oneOf([
    "orange",
    "green",
    "red",
    "blue",
    "purple",
    "rose"
  ]),
  cardTitle: PropTypes.node,
  cardSubtitle: PropTypes.node,
  content: PropTypes.node,
  footer: PropTypes.node,
  footerAlign: PropTypes.oneOf(["left", "center", "right"])
};

export default withStyles(headerCardStyle)(HeaderCard);
