using System.Threading.Tasks;
using Mohajjel.MeetingSystem.Shared.Models.Input.MyAction;
using Mohajjel.MeetingSystem.Shared.Models.Output.MyAction;

namespace Mohajjel.MeetingSystem.Client.Api
{
    public static partial class ApiList
    {
        public static OutputGetUsersActionsList[] GetUsersActionsList(InputGetUsersActionsList values)
        {
            var url = $"{BaseUrl}/MyAction/";
            const string methodName = nameof(GetUsersActionsList);

            var task = Task.Run(
                async () =>
                    await ApiConnector<OutputGetUsersActionsList[]>.Post(
                        url,
                        methodName, parameters: values)
            );

            return task.GetAwaiter().GetResult();
        }
    }
}