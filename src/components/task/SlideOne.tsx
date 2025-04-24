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
        value={taskData.title}
        className={`h-10 w-full resize-none rounded-md bg-transparent p-2 outline-none ${colorScheme.placeholderTextColor}`}
        placeholder="What's on your mind?"
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
      />
      <textarea
        value={taskData.description}
        className={`h-20 w-full resize-none rounded-md bg-transparent p-2 font-mono text-sm outline-none ${colorScheme.placeholderTextColor}`}
        placeholder="Description (optional)"
        onChange={(e) =>
          setTaskData({ ...taskData, description: e.target.value })
        }
      />
    </>
  );
};
