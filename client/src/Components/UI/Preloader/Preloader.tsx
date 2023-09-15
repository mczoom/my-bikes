import spinner from '../../images/spinner-wheel.png'

interface PreloaderProps {
  isLoading: boolean
}


export const Preloader = ({isLoading}: PreloaderProps) => {

    const preloaderClassName = `preloader ${isLoading ? '' : 'preloader_off'}`;

    return (
      <div className={preloaderClassName}>
        <img src={spinner} className="preloader__spinner" />
      </div>
    )
};
