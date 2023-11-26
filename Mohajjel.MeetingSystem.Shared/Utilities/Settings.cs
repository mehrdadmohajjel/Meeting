
namespace Mohajjel.MeetingSystem.Shared.Utilities
{
    public static class Settings
    {
        public static string SystemCode { get; } = "007";

        // If you changed this path, remember to add it into ../robocopy-ignored-directories.txt 
        public static string UploaderFilesLocations { get; } = "~/UploadedFiles";
    }
}
