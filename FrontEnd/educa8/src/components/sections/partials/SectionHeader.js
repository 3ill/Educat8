import React, { useState } from 'react';
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

  const uploadSection = classNames('upload-section');

  const Component = tag;

  const [file, setfile] = useState(null);

  const onChangeHandler = (event) => {
    const file = event.target.files[0];
    console.log(file) // This is the path
    // return
    // new Promise((resolve, reject) => {
    //   var reader = new FileReader();
    //   reader.onload = function () {
    //     var aud = new Audio(reader.result);
    //     aud.onloadedmetadata = function () {
    //       // resolve(convertHMS(aud.duration));
    //     };
    //   };
    //   reader.readAsDataURL(file);
    // })
    //   .then((duration) => {
    //     console.log("The file", file)
    //     setfile({ file, duration, size: file?.size });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };


  const handleVideoChange = () => {

  }

  const onSubmit = () => {

  }

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
                {isButtonUse &&  <div className={uploadSection}>
                  <input placeholder='Video Title' name='v-title' />
                  {
                    <>
                      <form onSubmit={onSubmit}>
                      {/* <label for="btn-actual" style={{ marginTop: '-18px' }}>
                        <h1 className='button button-primary button-wide-mobile button-sm' style={{ background: 'green' }}>Select Video</h1>
                      </label> */}
                      {/* style={{ display: 'none' }}  */}
                        <input type="file" id='btn-actual' onChange={onChangeHandler} />
                      </form>
                      <button className='button button-primary button-wide-mobile button-lg' style={{ width: '300px'}} onClick={onChangeHandler}>Upload Video</button>
                    </>
                    
                  }
                  </div>} 
               
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