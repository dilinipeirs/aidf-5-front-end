function LocationTab(props) {
  const handleClick = () => {
    props.onClick(props.location);
  };

  if (props.location._id === props.selectedLocation) {
    return (
      <div
        className="text-base bg-sage-mist text-charcoal-slate border border-dusty-blue rounded-full px-2 py-1 cursor-pointer"
        onClick={handleClick}
      >
        {props.location.name}
      </div>
    );
  }

  return (
    <div
      className="text-base text-charcoal-slate border border-warm-taupe rounded-full px-2 py-1 cursor-pointer hover:bg-warm-taupe/50"
      onClick={handleClick}
    >
      {props.location.name}
    </div>
  );
}

export default LocationTab;
