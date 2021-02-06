import React from 'react';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import styles from '../styles/Modal.module.css';
import { useSpring, animated } from 'react-spring/web.cjs';
import Header from './header'
import FormClient from './formClient'
import FormWorker from './formWorker'
import 'normalize.css/normalize.css'
import '../styles/styles.scss'

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter();
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited();
        }
      },
    });
  
    return (
      <animated.div ref={ref} style={style} {...other}>
        {children}
      </animated.div>
    );
  });
  
  Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
  };

function SignUp () {
    const [openClient, setOpenClient] = React.useState(false);
    const [openWorker, setOpenWorker] = React.useState(false);


    const handleOpenClient = () => {
    setOpenClient(true);
    };

    const handleOpenWorker = () => {
      setOpenWorker(true);
      };

    const handleCloseClient = () => {
    setOpenClient(false);
    }

    const handleCloseWorker = () => {
      setOpenWorker(false);
      }

    return(
        <div className="mainPage">
            <div>
                <button type="button" onClick={handleOpenClient} className="client">
                Are you looking for Helpers?
                </button>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={styles.modal}
                open={openClient}
                onClose={handleCloseClient}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={openClient}>
                <div className={styles.paper}>
                <Header setOpen={setOpenClient} />
                <FormClient />
                </div>
                </Fade>
            </Modal>
            </div>
            <div>
                <button type="button" onClick={handleOpenWorker} className="worker">
                    Are you looking for Service Jobs?
                    </button>
                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    className={styles.modal}
                    open={openWorker}
                    onClose={handleCloseWorker}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={openWorker}>
                    <div className={styles.paper}>
                    <Header setOpen={setOpenWorker} />
                    <FormWorker />
                    </div>
                    </Fade>
                </Modal>
            </div>
            
        </div>
    )
}

export default SignUp