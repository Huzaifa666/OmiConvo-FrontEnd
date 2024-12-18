import { cn } from '@/utility/utils';

const LandingButton = (props) => {
  return (
    <button
      type="submit"
      className={cn(
        'rounded-md bg-blue-primary p-2 text-white hover:bg-blue-600',
        props.className,
      )}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.disabled ? (
        <div className="animate-bounce">......</div>
      ) : (
        props.text
      )}
    </button>
  );
};

export default LandingButton;
