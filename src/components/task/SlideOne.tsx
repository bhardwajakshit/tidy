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
        className={`w-full h-10 p-2 rounded-md resize-none bg-transparent outline-none ${colorScheme.placeholderTextColor}`}
        placeholder="What's on your mind?"
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
      />
      <textarea
        className={`w-full h-20 p-2 rounded-md resize-none bg-transparent outline-none font-mono ${colorScheme.placeholderTextColor}`}
        placeholder="Description (optional)"
        onChange={(e) =>
          setTaskData({ ...taskData, description: e.target.value })
        }
      />
    </>
  );
};
