using System.Threading.Tasks;
using Mohajjel.MeetingSystem.Shared.Models.Input.ReceivedTranscript;
using Mohajjel.MeetingSystem.Shared.Models.Output.ReceivedTranscript;

namespace Mohajjel.MeetingSystem.Client.Api
{
    public static partial class ApiList
    {
        public static OutputGetMeetingTranscriptListByDate[] GetMeetingTranscriptListByDate(InputGetMeetingTranscriptListByDate values)
        {
            var url = $"{BaseUrl}/ReceivedTranscript/";
            const string methodName = nameof(GetMeetingTranscriptListByDate);

            var task = Task.Run(
                async () =>
                    await ApiConnector<OutputGetMeetingTranscriptListByDate[]>.Post(
                        url,
                        methodName, parameters: values)
            );

            return task.GetAwaiter().GetResult();
        }
    }
}