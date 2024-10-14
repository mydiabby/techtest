local blaze = std.extVar('blaze');

{
    getVar: function(params) 
        local getDefault = function() if std.objectHas(params, 'default') then params.default
            else error 'could not get variable using ' + std.manifestJson(params);
        if std.objectHas(params, 'env') && std.objectHas(blaze.environment, params.env) then blaze.environment[params.env]
        else if std.objectHas(params, 'var') then 
            (
                local res = std.foldl(
                    function (res, nextKey) if res.found && std.objectHas(res.value, nextKey) then { found: true, value: res.value[nextKey] } else { found: false }, 
                    std.split(params.var, '.'), 
                    { found: true, value: blaze.vars }
                );
                if res.found then res.value else getDefault()
            )
        else getDefault()
}