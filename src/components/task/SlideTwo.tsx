export const SlideTwo = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h1>How important is it?</h1>
      <p>
        <input type="radio" name="priority" value="Low" />
        Low
      </p>
      <p>
        <input type="radio" name="priority" value="Medium" />
        Medium
      </p>
      <p>
        <input type="radio" name="priority" value="High" />
        High
      </p>
    </div>
  );
};
