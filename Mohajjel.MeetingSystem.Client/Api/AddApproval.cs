using System.Threading.Tasks;
using Mohajjel.MeetingSystem.Shared.Models.Input.AddApproval;
using Mohajjel.MeetingSystem.Shared.Models.Output.AddApproval;

namespace Mohajjel.MeetingSystem.Client.Api
{
    public static partial class ApiList
    {
        public static OutputGetAllMeetingApprovalsByMeetingId[] GetAllMeetingApprovalsByMeetingId
            (InputGetAllMeetingApprovalsByMeetingId input, string token)
        {
            var url = $"{BaseUrl}/AddApproval/";
            const string methodName = nameof(GetAllMeetingApprovalsByMeetingId);

            var task = Task.Run(async () => await ApiConnector<OutputGetAllMeetingApprovalsByMeetingId[]>.Post(url, methodName, token, input));

            return task.GetAwaiter().GetResult();
        }

        public static string AddApprovals(InputAddApprovals values, string token)
        {
            var url = $"{BaseUrl}/AddApproval/";
            const string methodName = nameof(AddApprovals);

            var task = Task.Run(
                async () =>
                    await ApiConnector<string>.Post(
                        url,
                        methodName, parameters: values, token: token)
            );

            return task.GetAwaiter().GetResult();
        }

        public static string AddDescriptionToMeeting(InputAddDescriptionToMeeting values, string token)
        {
            var url = $"{BaseUrl}/AddApproval/";
            const string methodName = nameof(AddDescriptionToMeeting);

            var task = Task.Run(
                async () =>
                    await ApiConnector<string>.Post(
                        url,
                        methodName, parameters: values, token: token)
            );

            return task.GetAwaiter().GetResult();
        }

        public static string DeleteMeetingApprovals(InputDeleteMeetingApprovals values, string token)
        {
            var url = $"{BaseUrl}/AddApproval/";
            const string methodName = nameof(DeleteMeetingApprovals);

            var task = Task.Run(
                async () =>
                    await ApiConnector<string>.Post(
                        url,
                        methodName, parameters: values, token: token)
            );

            return task.GetAwaiter().GetResult();
        }

        public static string UpdateApproval(InputUpdateApproval input, string token)
        {
            var url = $"{BaseUrl}/AddApproval/";
            const string methodName = nameof(UpdateApproval);

            var task = Task.Run(
                async () =>
                    await ApiConnector<string>.Post(
                        url,
                        methodName, token: token, input)
            );

            return task.GetAwaiter().GetResult();
        }

        public static string SetMeetingApprovalStatusAndSendMessage(InputSetMeetingApprovalStatusAndSendMessage values, string token)
        {
            var url = $"{BaseUrl}/AddApproval/";
            const string methodName = nameof(SetMeetingApprovalStatusAndSendMessage);

            var task = Task.Run(
                async () =>
                    await ApiConnector<string>.Post(
                        url,
                        methodName, parameters: values, token: token)
            );

            return task.GetAwaiter().GetResult();
        }
    }
}