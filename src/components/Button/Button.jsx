import PropTypes from 'prop-types';
import "./Button.css"
export const Button = ({ handleBtnClick }) => {
  return (
    <button type='button' onClick={handleBtnClick} className="LoadMoreBtn"> Load More </button>
  );
};

export default Button;
Button.propTypes = {
  handleBtnClick: PropTypes.func,
};