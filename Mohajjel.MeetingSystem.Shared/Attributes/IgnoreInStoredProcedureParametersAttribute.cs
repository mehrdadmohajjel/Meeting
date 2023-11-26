using System;

namespace Mohajjel.MeetingSystem.Shared.Attributes
{
    [AttributeUsage(System.AttributeTargets.Property)]
    public class IgnoreInStoredProcedureParametersAttribute : Attribute
    {
    }
}