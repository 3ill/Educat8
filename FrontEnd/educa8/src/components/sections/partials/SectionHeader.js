import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    paragraph: PropTypes.string
  }).isRequired,
  children: PropTypes.node,
  tag: PropTypes.oneOf(['h1', 'h2', 'h3']),
  isButtonUse: PropTypes.bool,
}

const defaultProps = {
  children: null,
  tag: 'h2'
}

const SectionHeader = ({
  className,
  data,
  children,
  tag,
  isButtonUse,
  ...props
}) => {

  const classes = classNames(
    'section-header',
    className
  );

  const Component = tag;

  const handleUploadVideo = () => { }

  return (
    <>
      {(data.title || data.paragraph) &&
        <div
          {...props}
          className={classes}
          style={{ paddingBottom: '20px', background: 'transparent' }}
        >
          <div className="container-xs">
            {children}
            {data.title &&
              <Component className={
                classNames(
                  'mt-0',
                  data.paragraph ? 'mb-16' : 'mb-0'
                )}>{data.title}</Component>
            }
            {data.paragraph &&
              <div>
                <p className="m-0" style={{ marginBottom: '10px' }}>{data.paragraph}</p>
                { isButtonUse && <button className='button button-primary button-wide-mobile button-sm' onClick={handleUploadVideo}>Upload Video</button> }
                </div>
            }
          </div>
        </div>
      }
    </>
  );
}

SectionHeader.propTypes = propTypes;
SectionHeader.defaultProps = defaultProps;

export default SectionHeader;