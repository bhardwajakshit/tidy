export const SlideOne = ({
  taskData,
  setTaskData,
  colorScheme,
}: {
  taskData: any;
  setTaskData: any;
  colorScheme: any;
}) => {
  return (
    <>
      <textarea
        className={`h-10 w-full resize-none rounded-md bg-transparent p-2 outline-none ${colorScheme.placeholderTextColor}`}
        placeholder="What's on your mind?"
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
      />
      <textarea
        className={`h-20 w-full resize-none rounded-md bg-transparent p-2 font-mono outline-none ${colorScheme.placeholderTextColor}`}
        placeholder="Description (optional)"
        onChange={(e) =>
          setTaskData({ ...taskData, description: e.target.value })
        }
      />
    </>
  );
};
