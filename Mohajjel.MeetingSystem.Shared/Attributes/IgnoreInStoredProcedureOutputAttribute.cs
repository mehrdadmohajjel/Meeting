using System;

namespace Mohajjel.MeetingSystem.Shared.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class IgnoreInStoredProcedureOutputAttribute : Attribute
    {
    }
}