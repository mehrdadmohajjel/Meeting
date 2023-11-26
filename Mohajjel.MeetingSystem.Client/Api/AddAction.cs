using System.Threading.Tasks;
using Mohajjel.MeetingSystem.Shared.Models.Input.AddAction;
using Mohajjel.MeetingSystem.Shared.Models.Output.AddAction;

namespace Mohajjel.MeetingSystem.Client.Api
{
    public static partial class ApiList
    {
        public static OutputGetUserActiveMeeting[] GetUserActiveMeeting(InputGetUserActiveMeeting values, string token)
        {
            var url = $"{BaseUrl}/AddAction/";
            const string methodName = nameof(GetUserActiveMeeting);

            var task = Task.Run(
                async () => await ApiConnector<OutputGetUserActiveMeeting[]>.Post(
                    url,
                    methodName, parameters: values, token: token)
            );
            return task.GetAwaiter().GetResult();
        }

        public static OutputGetUserMeetingApprovalListByMeetingIdAndUserId[] GetUserMeetingApprovalListByMeetingIdAndUserId(InputGetUserMeetingApprovalListByMeetingIdAndUserId values, string token)
        {
            var url = $"{BaseUrl}/AddAction/";
            const string methodName = nameof(GetUserMeetingApprovalListByMeetingIdAndUserId);

            var task = Task.Run(
                async () => await ApiConnector<OutputGetUserMeetingApprovalListByMeetingIdAndUserId[]>.Post(
                    url,
                    methodName, parameters: values, token: token)
            );
            return task.GetAwaiter().GetResult();
        }

        public static string AddNewActionToApproval(InputAddNewActionToApproval values, string token)
        {
            var url = $"{BaseUrl}/AddAction/";
            const string methodName = nameof(AddNewActionToApproval);

            var task = Task.Run(
                async () =>
                    await ApiConnector<string>.Post(
                        url,
                        methodName, parameters: values, token: token)
            );

            return task.GetAwaiter().GetResult();
        }

        public static OutputGetActionListByApprovalId[] GetActionListByApprovalId(InputGetActionListByApprovalId values)
        {
            var url = $"{BaseUrl}/AddAction/";
            const string methodName = nameof(GetActionListByApprovalId);

            var task = Task.Run(
                async () => await ApiConnector<OutputGetActionListByApprovalId[]>.Post(
                    url,
                    methodName, parameters: values)
            );
            return task.GetAwaiter().GetResult();
        }

        public static string DeleteApprovalAction(InputDeleteApprovalAction values, string token)
        {
            var url = $"{BaseUrl}/AddAction/";
            const string methodName = nameof(DeleteApprovalAction);

            var task = Task.Run(
                async () =>
                    await ApiConnector<string>.Post(
                        url,
                        methodName, parameters: values, token: token)
            );

            return task.GetAwaiter().GetResult();
        }

        public static OutputGetMeetingApprovalActionAttachmentFile[] GetMeetingApprovalActionAttachmentFile(InputGetMeetingApprovalActionAttachmentFile values)
        {
            var url = $"{BaseUrl}/AddAction/";
            const string methodName = nameof(GetMeetingApprovalActionAttachmentFile);

            var task = Task.Run(
                async () => await ApiConnector<OutputGetMeetingApprovalActionAttachmentFile[]>.Post(
                    url,
                    methodName, parameters: values)
            );
            return task.GetAwaiter().GetResult();
        }

        public static string[] AddUploadAttachmentToMeetingApprovalAction(InputAddUploadAttachmentToMeetingApprovalAction input, string token)
        {
            var url = $"{BaseUrl}/AddAction/";
            const string methodName = nameof(AddUploadAttachmentToMeetingApprovalAction);

            var task = Task.Run(
                async () =>
                    await ApiConnector<string[]>.Post(
                        url,
                        methodName, parameters: input, token: token)
            );

            return task.GetAwaiter().GetResult();
        }

        public static string RemoveMeetingApprovalActionDocument(InputRemoveMeetingApprovalActionDocument input, string token)
        {
            var url = $"{BaseUrl}/AddAction/";
            const string methodName = nameof(RemoveMeetingApprovalActionDocument);

            var task = Task.Run(
                async () =>
                    await ApiConnector<string>.Post(
                        url,
                        methodName, parameters: input, token: token)
            );

            return task.GetAwaiter().GetResult();
        }

        public static OutputGetMeetingApprovalActionAttachmentFileById GetMeetingApprovalActionAttachmentFileById(InputGetMeetingApprovalActionAttachmentFileById values)
        {
            var url = $"{BaseUrl}/AddAction/";
            const string methodName = nameof(GetMeetingApprovalActionAttachmentFileById);

            var task = Task.Run(
                async () => await ApiConnector<OutputGetMeetingApprovalActionAttachmentFileById>.Post(
                    url,
                    methodName, parameters: values)
            );
            return task.GetAwaiter().GetResult();
        }
    }
}