using System.Threading.Tasks;
using Mohajjel.MeetingSystem.Shared.Models.Input.Home;
using Mohajjel.MeetingSystem.Shared.Models.Output.Home;

namespace Mohajjel.MeetingSystem.Client.Api
{
    public static partial class ApiList
    {
        public static OutputGetMeetingApprovalForEachUserByUserId[] GetMeetingApprovalForEachUserByUserId(InputGetMeetingApprovalForEachUserByUserId values, string token)
        {
            var url = $"{BaseUrl}/Home/";
            const string methodName = nameof(GetMeetingApprovalForEachUserByUserId);

            var task = Task.Run(
                async () =>
                    await ApiConnector<OutputGetMeetingApprovalForEachUserByUserId[]>.Post(
                        url,
                        methodName, token, parameters: values)
            );

            return task.GetAwaiter().GetResult();
        }

        public static OutputGetMeetingStatistics[] GetMeetingStatistics(InputGetMeetingStatistics values, string token)
        {
            var url = $"{BaseUrl}/Home/";
            const string methodName = nameof(GetMeetingStatistics);

            var task = Task.Run(
                async () =>
                    await ApiConnector<OutputGetMeetingStatistics[]>.Post(
                        url,
                        methodName, token, parameters: values)
            );

            return task.GetAwaiter().GetResult();
        }

    }
}