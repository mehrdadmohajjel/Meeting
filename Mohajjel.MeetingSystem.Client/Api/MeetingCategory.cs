using Mohajjel.MeetingSystem.Shared.Models.Input.MeetingCategory;
using Mohajjel.MeetingSystem.Shared.Models.Output.MeetingCategory;
using System.Threading.Tasks;

namespace Mohajjel.MeetingSystem.Client.Api
{
    public static partial class ApiList
    {

        public static string AddNewCategory(InputAddNewCategory values, string token)
        {
            var url = $"{BaseUrl}/MeetingCategory/";
            const string methodName = nameof(AddNewCategory);

            var task = Task.Run(
                async () =>
                    await ApiConnector<string>.Post(
                        url,
                        methodName, parameters: values, token: token)
            );

            return task.GetAwaiter().GetResult();
        }

        public static string EditCategory(InputEditCategory values, string token)
        {
            var url = $"{BaseUrl}/MeetingCategory/";
            const string methodName = nameof(EditCategory);

            var task = Task.Run(
                async () =>
                    await ApiConnector<string>.Post(
                        url,
                        methodName, parameters: values, token: token)
            );

            return task.GetAwaiter().GetResult();
        }
        public static string DeleteMeetingCategory(InputDeleteMeetingCategory values, string token)
        {
            var url = $"{BaseUrl}/MeetingCategory/";
            const string methodName = nameof(DeleteMeetingCategory);

            var task = Task.Run(
                async () =>
                    await ApiConnector<string>.Post(
                        url,
                        methodName, parameters: values, token: token)
            );

            return task.GetAwaiter().GetResult();
        }
        
        public static OutputGetLastCategoryCode GetLastCategoryCode()
        {
            var url = $"{BaseUrl}/MeetingCategory/";
            const string methodName = nameof(GetLastCategoryCode);

            var task = Task.Run(
                async () =>
                    await ApiConnector<OutputGetLastCategoryCode>.Post(
                        url,
                        methodName)
            );

            return task.GetAwaiter().GetResult();
        }

        public static OutputGetAllMeetingCategory[] GetAllMeetingCategory()
        {
            var url = $"{BaseUrl}/MeetingCategory/";
            const string methodName = nameof(GetAllMeetingCategory);

            var task = Task.Run(
                async () =>
                    await ApiConnector<OutputGetAllMeetingCategory[]>.Post(
                        url,
                        methodName, parameters: null)
            );

            return task.GetAwaiter().GetResult();
        }

        public static OutputGetAllMainDepartment[] GetAllMainDepartment()
        {
            var url = $"{BaseUrl}/MeetingCategory/";
            const string methodName = nameof(GetAllMainDepartment);

            var task = Task.Run(
                async () =>
                    await ApiConnector<OutputGetAllMainDepartment[]>.Post(
                        url,
                        methodName, parameters: null)
            );

            return task.GetAwaiter().GetResult();
        }
    }
}